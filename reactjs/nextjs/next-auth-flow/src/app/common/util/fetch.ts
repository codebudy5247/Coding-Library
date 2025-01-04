import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";
import {
  AUTHENTICATION_COOKIE,
  REFRESH_COOKIE,
} from "../../(auth)/auth-cookie";
import { setCookie } from "@/app/(auth)/signin/signin";

// Refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = cookies().get(REFRESH_COOKIE)?.value;
    if (!refreshToken) {
      throw new Error("Refresh token not found.");
    }
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!res.ok) {
      const parsedRes = await res.json().catch(() => ({}));
      return { error: getErrorMessage(parsedRes) || "Unknown error occurred." };
    }
    const { access_token } = await res.json();
    if (!access_token) {
      throw new Error("Access token not found in the response.");
    }
    setCookie(AUTHENTICATION_COOKIE, access_token);
    return { access_token };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return { error: error || "Failed to refresh access token." };
  }
};

// Post request
export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "", data: parsedRes };
};

// Get request
export const get = async <T>(
  path: string,
  tags?: string[],
  params?: URLSearchParams
): Promise<T | { error: string }> => {
  const constructUrl = () =>
    params ? `${API_URL}/${path}?${params}` : `${API_URL}/${path}`;

  const fetchWithAuth = async (token: string | undefined): Promise<Response> =>
    fetch(constructUrl(), {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { tags },
    });

  let token = cookies().get(AUTHENTICATION_COOKIE)?.value;
  let res = await fetchWithAuth(token);

  if (!res.ok && res.status === 401) {
    const refreshResult = await refreshAccessToken();

    if (refreshResult.access_token) {
      token = refreshResult.access_token;
      res = await fetchWithAuth(token);
    } else {
      return { error: "Unable to refresh access token" };
    }
  }
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return parsedRes as T;
};
