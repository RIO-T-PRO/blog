import { z } from "zod";

export const createWriterSchema = z.object({
  user_id: z.string().min(1, "User ID is required"),
  website: z.string().min(1, "Website is required"),
});

export const updateWriterBodySchema = z.object({
  website: z.string().min(1, "Website is required"),
});

export const writerIdParamSchema = z.object({
  writerId: z.string().min(1, "Writer ID is required"),
});

export const writerDashboardQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
});

export type CreateWriterBody = z.infer<typeof createWriterSchema>;
export type UpdateWriterBody = z.infer<typeof updateWriterBodySchema>;
export type WriterIdParam = z.infer<typeof writerIdParamSchema>;
export type WriterDashboardQuery = z.infer<typeof writerDashboardQuerySchema>;
