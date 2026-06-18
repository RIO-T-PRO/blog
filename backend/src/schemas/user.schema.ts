import { z } from "zod";

// Full user model (database/domain)
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Signup – includes password confirmation
export const SignupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

// Signin – only email and password
export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Keep the original create/update schemas for internal use (e.g., DB ops)
export const CreateUserSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
});

export const UpdateUserSchema = CreateUserSchema.partial();

// Route parameter for user ID
export const UserIdParam = z.object({
  userId: z.string().uuid(),
});

// Type exports
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UserIdParamType = z.infer<typeof UserIdParam>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;
