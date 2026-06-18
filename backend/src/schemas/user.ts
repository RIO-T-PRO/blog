import { z } from "zod";
import { UUIDSchema } from "./common.js";

export const SignupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const CreateUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const UserIdSchema = UUIDSchema;

// Types (if needed elsewhere)
export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
