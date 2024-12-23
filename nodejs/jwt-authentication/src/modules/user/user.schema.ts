import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(5).max(20),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "Password must contain both letters and numbers"
    ),
});
