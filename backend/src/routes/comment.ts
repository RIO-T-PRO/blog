import { updateArticleController } from "@/controllers/article.js";
import {
  createCommentController,
  deleteCommentController,
  getCommentsController,
  updateCommentController,
} from "@/controllers/comment.js";
import { authenticate } from "@/middlewares/auth.js";
import { requireRole } from "@/middlewares/role-require.js";
import { validate } from "@/middlewares/validate.js";
import { ArticleIdParamSchema } from "@/schemas/article.js";
import {
  CommentIdSchema,
  CreateCommentSchema,
  UpdateCommentSchema,
} from "@/schemas/comment.js";
import express from "express";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:articleId",
  validate(ArticleIdParamSchema, "params"),
  getCommentsController,
);

router.get(
  "/:articleId",
  validate(ArticleIdParamSchema, "params"),
  validate(CreateCommentSchema, "body"),
  createCommentController,
);

router.post(
  "/:commentId",
  validate(CommentIdSchema, "params"),
  validate(UpdateCommentSchema, "body"),
  updateCommentController,
);

router.delete(
  "/:commentId",
  validate(CommentIdSchema, "params"),
  requireRole("admin"),
  deleteCommentController,
);

export default router;
