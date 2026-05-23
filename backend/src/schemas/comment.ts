import { z } from "zod";

export const commentIdParamSchema = z.object({
  comment_id: z.string().uuid("Invalid comment ID"),
});

export const createCommentBodySchema = z.object({
  post_id: z.string().uuid("Invalid post ID"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(2000, "Content too long"),
  status: z.enum(["pending", "approved", "spam"]).default("pending"),
});

export const updateCommentBodySchema = z.object({
  content: z.string().min(1).max(2000).optional(),
  status: z.enum(["pending", "approved", "spam"]).optional(),
});

export type CommentIdParam = z.infer<typeof commentIdParamSchema>;
export type CreateCommentBody = z.infer<typeof createCommentBodySchema>;
export type UpdateCommentBody = z.infer<typeof updateCommentBodySchema>;
