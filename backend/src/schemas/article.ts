import { z } from "zod";
import { UUIDSchema } from "./common.js";

export const ArticleStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const CreateArticleSchema = z.object({
  title: z.string().min(3),
  slug: z.string(),
  excerpt: z.string().optional(),
  content: z.string(),
  featuredImage: z.string().url().optional(),
  status: ArticleStatusSchema.optional(),
});

export const articleQuerySchema = z.object({
  status: z.string().optional(),
  search: z.string().optional(),
  authorId: z.string().optional(),
  skip: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().min(1).max(100).optional(),
});

export const UpdateArticleSchema = CreateArticleSchema.partial();

export const ArticleIdParamSchema = z.object({
  articleId: UUIDSchema,
});

export type CreateArticle = z.infer<typeof CreateArticleSchema>;
export type UpdateArticle = z.infer<typeof UpdateArticleSchema>;
export type ArticleStatus = z.infer<typeof ArticleStatusSchema>;
export type ArticleQuery = z.infer<typeof articleQuerySchema>;
export type ArticleIdParam = z.infer<typeof ArticleIdParamSchema>;
