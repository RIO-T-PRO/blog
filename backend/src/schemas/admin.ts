import { z } from "zod";

export const adminDashboardQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  published: z.coerce.boolean().optional(),
});

export const updateAdminBodySchema = z.object({
  role: z.enum(["ADMIN", "SUPER_ADMIN"]).optional(),
});

export const adminIdParamSchema = z.object({
  adminId: z.string().uuid("Invalid admin ID"),
});

export type AdminIdParam = z.infer<typeof adminIdParamSchema>;
export type AdminDashboardQuery = z.infer<typeof adminDashboardQuerySchema>;
export type UpdateAdminBody = z.infer<typeof updateAdminBodySchema>;
