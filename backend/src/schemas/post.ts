import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  cover_image: z.string().optional(),
  published: z.boolean().optional(),
});

export const updatePostSchema = createPostSchema.partial();

export const postIdParamSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
});

export const postIdQuerySchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
});

export type postBody = z.infer<typeof createPostSchema>;
export type updatePostBody = z.infer<typeof updatePostSchema>;
export type postIdParam = z.infer<typeof postIdParamSchema>;
export type postIdQuery = z.infer<typeof postIdParamSchema>;
