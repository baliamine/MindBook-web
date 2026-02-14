import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().regex(/^\+?[0-9]{8,15}$/, "Invalid phone number"),
});

export type SignupFormData = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
