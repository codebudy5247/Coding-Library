import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_URL } from "@/app/common/constants/api";
import { REFRESH_COOKIE, AUTHENTICATION_COOKIE } from "@/app/(auth)/auth-cookie";

export async function POST() {
  console.log("All cookies received:", cookies().getAll());

  const refreshToken = cookies().get(REFRESH_COOKIE)?.value
  console.log("refreshToken server route", refreshToken);
  
  if (!refreshToken) {
    return NextResponse.json({ error: "Refresh token not found." }, { status: 401 });
  }

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return NextResponse.json({ error }, { status: res.status });
  }

  const { access_token } = await res.json();
  console.log("access_token server route", access_token);
  if (!access_token) {
    return NextResponse.json({ error: "Access token not found in response." }, { status: 500 });
  }

  cookies().set(AUTHENTICATION_COOKIE, access_token, {
    secure: true,
    httpOnly: true,
  });

  return NextResponse.json({ access_token });
}
