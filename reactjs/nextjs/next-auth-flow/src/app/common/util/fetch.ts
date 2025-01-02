import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";
import { AUTHENTICATION_COOKIE } from "../../(auth)/auth-cookie";

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});

// Refresh token
const refreshAccessToken = async () => {
  const refreshToken = cookies().get("access_token");
  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }
  const res = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken.value }),
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Unable to refresh token");
  }
  const { access_token } = await res.json();
  cookies().set({
    name: AUTHENTICATION_COOKIE,
    value: access_token,
    secure: true,
    httpOnly: true,
    expires: new Date(jwtDecode(access_token).exp! * 1000),
  });
  return { access_token };
};

const authenticatedReq = async (input: RequestInfo, init?: RequestInit) => {
  let response = await fetch(input, init);
  if (response.status === 401) {
    try {
      const { access_token } = await refreshAccessToken();
      cookies().set({
        name: AUTHENTICATION_COOKIE,
        value: access_token,
        secure: true,
        httpOnly: true,
        expires: new Date(jwtDecode(access_token).exp! * 1000),
      });
      const updatedHeaders = {
        ...init?.headers,
        Authorization: `Bearer ${access_token}`,
      };
      response = await fetch(input, { ...init, headers: updatedHeaders });
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw new Error("Unauthorized. Please log in again.");
    }
  }
  return response;
};

// POST request with automatic token refresh
export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;

  const res = await authenticatedReq(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
    body: JSON.stringify(body),
  });

  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "", data: parsedRes };
};

// GET request with automatic token refresh
export const get = async <T>(
  path: string,
  tags?: string[],
  params?: URLSearchParams
): Promise<T> => {
  const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`;

  const res = await authenticatedReq(url, {
    headers: {
      ...getHeaders(),
    },
    next: { tags },
  });

  return res.json() as T;
};

// export const post = async (path: string, data: FormData | object) => {
//   const body = data instanceof FormData ? Object.fromEntries(data) : data;
//   const res = await fetch(`${API_URL}/${path}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", ...getHeaders() },
//     body: JSON.stringify(body),
//   });
//   const parsedRes = await res.json();
//   if (!res.ok) {
//     return { error: getErrorMessage(parsedRes) };
//   }
//   return { error: "", data: parsedRes };
// };

// export const get = async <T>(
//   path: string,
//   tags?: string[],
//   params?: URLSearchParams
// ) => {
//   const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`;
//   const res = await fetch(url, {
//     headers: { ...getHeaders() },
//     next: { tags },
//   });
//   return res.json() as T;
// };
