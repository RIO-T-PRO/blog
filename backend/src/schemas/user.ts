import { z } from "zod";

export const dashboardParamsSchema = z.object({
  userId: z.string().min(1),
});

export const dashboardQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(15),
});

export const updateUserParamsSchema = z.object({
  userId: z.string().uuid(),
});

export const updateUserBodySchema = z.object({
  fullname: z.string().min(3).optional(),
  email: z.string().email().optional(),
  // Profile nested data
  profile: z
    .object({
      bio: z.string().max(500).optional(),
      avatar: z.string().url().optional(),
    })
    .optional(),
});

export type UpdateUserParams = z.infer<typeof updateUserParamsSchema>;
export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;

export type DashboardParams = z.infer<typeof dashboardParamsSchema>;
export type DashboardQuery = z.infer<typeof dashboardQuerySchema>;
export type slugParamId = {
  slug: string;
};
