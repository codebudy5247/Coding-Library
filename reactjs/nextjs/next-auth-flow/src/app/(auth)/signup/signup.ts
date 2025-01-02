"use server";
import * as z from "zod";
import { redirect } from "next/navigation";
import { post } from "@/app/common/util/fetch";
import { RegisterSchema } from "../auth-schema";

export default async function createUser(
  values: z.infer<typeof RegisterSchema>
) {
  const { error } = await post("users", values);
  if (error) {
    return { error };
  }
  redirect("/signin");
}
