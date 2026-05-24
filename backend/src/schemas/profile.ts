import { z } from "zod";

export const profileIdParamSchema = z.object({
  profileId: z.string().uuid({ message: "Invalid profile ID format" }),
});

export const createProfileBodySchema = z.object({
  bio: z.string().max(500, "Bio too long").optional(),
  avatar: z.string().url("Invalid avatar URL").optional(),
});

export const updateProfileBodySchema = z.object({
  bio: z.string().max(500, "Bio too long").optional(),
  avatar: z.string().url("Invalid avatar URL").optional(),
});

export type ProfileIdParam = z.infer<typeof profileIdParamSchema>;
export type CreateProfileBody = z.infer<typeof createProfileBodySchema>;
export type UpdateProfileBody = z.infer<typeof updateProfileBodySchema>;
