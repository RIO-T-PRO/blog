import { z } from "zod";
import { UUIDSchema } from "./common.js";

export const CreateCommentSchema = z.object({
  articleId: UUIDSchema,
  parentId: UUIDSchema.optional(),
  content: z.string().min(1).max(5000),
});

export const UpdateCommentSchema = z.object({
  content: z.string().min(1).max(5000),
});

export const CommentIdParam = z.object({
  commentId: UUIDSchema,
});

export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type UpdateComment = z.infer<typeof UpdateCommentSchema>;
