import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(3, {
    message: "Name is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

export const SignupSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required",
  }),
  username: z.string().min(3, {
    message: "Username is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password is required",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required.",
  }),
});
