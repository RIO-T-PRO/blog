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

export const UpdateArticleSchema = CreateArticleSchema.partial();

export const ArticleIdParam = z.object({
  articleId: UUIDSchema,
});

export type CreateArticle = z.infer<typeof CreateArticleSchema>;
export type UpdateArticle = z.infer<typeof UpdateArticleSchema>;
