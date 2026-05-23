import { z } from "zod";

export const dashboardParamsSchema = z.object({
  user_id: z.string().min(1),
});

export const dashboardQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(15),
});

export type DashboardParams = z.infer<typeof dashboardParamsSchema>;
export type DashboardQuery = z.infer<typeof dashboardQuerySchema>;
