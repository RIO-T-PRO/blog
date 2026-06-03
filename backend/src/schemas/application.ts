import { z } from "zod";

export const applyWriterSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(20, "Reason must be at least 20 characters long.")
    .max(2000, "Reason cannot exceed 2000 characters."),

  website: z
    .string()
    .trim()
    .url("Please provide a valid website URL.")
    .optional()
    .or(z.literal("")),
});

export const writerApplicationIdParamSchema = z.object({
  applicationId: z.uuid(),
});

export const reviewWriterApplicationSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
});

export type ApplyWriterBody = z.infer<typeof applyWriterSchema>;

export type WriterApplicationIdParam = z.infer<
  typeof writerApplicationIdParamSchema
>;

export type ReviewWriterApplicationBody = z.infer<
  typeof reviewWriterApplicationSchema
>;
