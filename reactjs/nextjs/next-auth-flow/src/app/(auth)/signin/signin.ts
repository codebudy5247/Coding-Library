"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";
import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/util/errors";
import { AUTHENTICATION_COOKIE, REFRESH_COOKIE } from "../auth-cookie";
import { LoginSchema } from "../auth-schema";

export const setCookie = (name: string, value: string) => {
  cookies().set({
    name,
    value,
    secure: true,
    httpOnly: true,
  });
};
export default async function login(values: z.infer<typeof LoginSchema>) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  // cookies().set({
  //   name: AUTHENTICATION_COOKIE,
  //   value: parsedRes.access_token,
  //   secure: true,
  //   httpOnly: true,
  //   expires: new Date(jwtDecode(parsedRes.access_token).exp! * 1000),
  // });
  setCookie(AUTHENTICATION_COOKIE, parsedRes.access_token);
  setCookie(REFRESH_COOKIE, parsedRes.refresh_token);
  redirect("/");
}

// const setAuthCookie = (response: Response) => {
//   const setCookieHeader = response.headers.get("Set-Cookie");
//   if (setCookieHeader) {
//     const token = setCookieHeader.split(";")[0].split("=")[1];
//     cookies().set({
//       name: AUTHENTICATION_COOKIE,
//       value: token,
//       secure: true,
//       httpOnly: true,
//       expires: new Date(jwtDecode(token).exp! * 1000),
//     });
//   }
// };
