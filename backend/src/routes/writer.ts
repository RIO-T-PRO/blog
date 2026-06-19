import {
  createArticleController,
  getArticlesController,
  updateArticleController,
} from "@/controllers/article.js";
import { deleteArticle } from "@/database/services/article.js";
import { authenticate } from "@/middlewares/auth.js";
import { requireRole } from "@/middlewares/role-require.js";
import { validate } from "@/middlewares/validate.js";
import {
  ArticleIdParamSchema,
  CreateArticleSchema,
  UpdateArticleSchema,
} from "@/schemas/article.js";
import express from "express";

const router = express.Router();

router.use(authenticate);

// article
router.post(
  "/article",
  validate(CreateArticleSchema, "body"),
  requireRole("writer"),
  createArticleController,
);

router.post(
  "/article/:articleId",
  validate(UpdateArticleSchema, "body"),
  validate(ArticleIdParamSchema, "params"),
  requireRole("writer"),
  updateArticleController,
);

router.delete(
  "/article/:articleId",
  validate(ArticleIdParamSchema, "params"),
  requireRole("admin", "writer"),
  deleteArticle,
);

router.get("/articles", requireRole("writer"), getArticlesController);

export default router;
