import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Enter a valid email" })
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(32, "Password must be at most 32 characters long"),
});