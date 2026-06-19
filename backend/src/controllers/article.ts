import { Request, Response } from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  listArticles,
  updateArticle,
} from "@/database/services/article.js";
import { resError, resSuccess } from "@/utils/index.js";
import {
  ArticleIdParam,
  ArticleQuery,
  CreateArticle,
  UpdateArticle,
} from "@/schemas/article.js";
import { ArticleStatus } from "@/generated/prisma/enums.js";

export const createArticleController = async (req: Request, res: Response) => {
  try {
    const authorId = req.user?.id;

    const { title, slug, excerpt, content, featuredImage, status } =
      req.body as CreateArticle;

    const article = await createArticle({
      authorId,
      title,
      excerpt,
      content,
      featuredImage,
      status: status ?? "DRAFT",
      slug: slug,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    });

    return resSuccess(
      res,
      { data: article },
      "Article created successfully",
      201,
    );
  } catch (error) {
    console.error("Create article error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const getArticlesController = async (req: Request, res: Response) => {
  try {
    const { status, search, authorId, skip, take } = req.query as ArticleQuery;
    const user = req.user;

    const isAdminOrWriter = user?.roles?.some((role) =>
      ["admin", "writer"].includes(role),
    );

    const statusFilter = isAdminOrWriter
      ? status
        ? (String(status) as ArticleStatus)
        : undefined
      : "PUBLISHED"; // forced to published for non‑privileged viewers

    const articles = await listArticles({
      status: statusFilter,
      search: search ? String(search) : undefined,
      authorId: authorId ? String(authorId) : undefined,
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
    });

    return resSuccess(res, { data: articles }, "Articles fetched successfully");
  } catch (error) {
    console.error("Get articles error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const getArticleController = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params as ArticleIdParam;

    const article = await getArticleById(articleId);

    if (!article) {
      return resError(res, "Article not found", 404);
    }

    return resSuccess(res, { data: article }, "Article fetched successfully");
  } catch (error) {
    console.error("Get article error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const updateArticleController = async (req: Request, res: Response) => {
  try {
    const authorId = req.user.id;
    const { articleId } = req.params as ArticleIdParam;

    const article = await getArticleById(articleId);

    if (!article) {
      return resError(res, "Article not found", 404);
    }

    const isAdmin = req.user?.roles?.includes("admin");
    if (article.authorId !== authorId && !isAdmin) {
      return resError(res, "Forbidden", 403);
    }

    const body = req.body as UpdateArticle;

    const updated = await updateArticle(article.id, {
      title: body.title,
      excerpt: body.excerpt ?? undefined,
      content: body.content,
      featuredImage: body.featuredImage ?? undefined,
      status: body.status,
      publishedAt:
        body.status === "PUBLISHED" ? new Date() : article.publishedAt,
      slug: body.slug,
    });

    return resSuccess(res, { data: updated }, "Article updated successfully");
  } catch (error) {
    console.error("Update article error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const deleteArticleController = async (req: Request, res: Response) => {
  try {
    const authorId = req.user?.id;

    const { articleId } = req.params as ArticleIdParam;
    const article = await getArticleById(articleId);

    if (!article) {
      return resError(res, "Article not found", 404);
    }

    const isAdmin = req.user?.roles?.includes("admin");
    if (article.authorId !== authorId && !isAdmin) {
      return resError(res, "Forbidden", 403);
    }

    await deleteArticle(article.id);

    return resSuccess(res, "Article deleted successfully");
  } catch (error) {
    console.error("Delete article error", error);
    return resError(res, "Internal server error", 500);
  }
};
