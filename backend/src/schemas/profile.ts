import { z } from "zod";
import { UUIDSchema } from "./common.js";

export const CreateProfileSchema = z.object({
  username: z.string().min(3).max(30),
  bio: z.string().max(500).nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
  website: z.string().url().nullable().optional(),
});

export const UpdateProfileSchema = CreateProfileSchema.partial();

export const ProfileIdParam = z.object({
  profileId: UUIDSchema,
});

export type CreateProfile = z.infer<typeof CreateProfileSchema>;
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;
