import { Request, Response } from "express";
import {
  createComment,
  getCommentById,
  hideComment,
  listCommentsByArticle,
  updateComment,
} from "@/database/services/comment.js";
import { resError, resSuccess } from "@/utils/index.js";
import { ArticleIdParam } from "@/schemas/article.js";
import {
  CommentIdParam,
  CreateComment,
  UpdateComment,
} from "@/schemas/comment.js";

export const createCommentController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { articleId } = req.params as ArticleIdParam;
    const { content, parentId } = req.body as CreateComment;

    const comment = await createComment({
      articleId,
      userId,
      content,
      parentId: parentId ?? null,
    });

    return resSuccess(res, { comment }, "Comment created successfully", 201);
  } catch (error) {
    console.error("Create comment error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const getCommentsController = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params as ArticleIdParam;

    const comments = await listCommentsByArticle(articleId);

    return resSuccess(res, { comments }, "Comments fetched successfully");
  } catch (error) {
    console.error("Get comments error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const updateCommentController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const { commentId } = req.params as CommentIdParam;
    const comment = await getCommentById(commentId);

    if (!comment) {
      return resError(res, "Comment not found", 404);
    }

    const isAdmin = req.user?.roles?.includes("admin");
    if (comment.user.id !== userId && !isAdmin) {
      return resError(res, "Forbidden", 403);
    }

    const { content } = req.body as UpdateComment;

    const updated = await updateComment(comment.id, { content });

    return resSuccess(res, { updated }, "Comment updated successfully");
  } catch (error) {
    console.error("Update comment error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const { commentId } = req.params as CommentIdParam;
    const comment = await getCommentById(commentId);

    if (!comment) {
      return resError(res, "Comment not found", 404);
    }

    const isAdmin = req.user?.roles?.includes("admin");
    if (comment.user.id !== userId && !isAdmin) {
      return resError(res, "Forbidden", 403);
    }

    await hideComment(comment.id);

    return resSuccess(res, "Comment deleted successfully");
  } catch (error) {
    console.error("Delete comment error", error);
    return resError(res, "Internal server error", 500);
  }
};
