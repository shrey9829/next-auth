import * as z from "zod";

export const SettingsSchema = z.object({
  name: z.optional(
    z.string().min(1, {
      message: "Name is required!",
    })
  ),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters is required!",
  }),
  image: z.string(),
  firstName: z.string().min(1, {
    message: "First Name is required!",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required!",
  }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "email is required!",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters are required!",
  }),
});
