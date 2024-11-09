import { z } from "zod";

const isValidEmail = z
  .string({ required_error: "Email is required" })
  .email({ message: "Invalid email address" });

const isValidPassword = z
  .string({ required_error: "Password is required" })
  .min(8, { message: "Password should contain atleast 8 characters" })
  .max(20, { message: "Password should not exceed 20 characters" });

export const UserRegisterSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .min(3, { message: "Username should contain atleast 3 characters" })
      .max(20, { message: "Username should not exceed 20 characters" }),
    email: isValidEmail,
    password: isValidPassword,
    role: z.enum(["USER", "ADMIN"]),
  })
  .strict();

export const UserLoginSchema = z.object({
  email: isValidEmail,
  password: isValidPassword,
});
