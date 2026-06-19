import {
  createArticleController,
  getArticleController,
  getArticlesController,
  updateArticleController,
} from "@/controllers/article.js";
import { deleteArticle } from "@/database/services/article.js";
import { authenticate } from "@/middlewares/auth.js";
import { requireRole } from "@/middlewares/role-require.js";
import { validate } from "@/middlewares/validate.js";
import {
  ArticleIdParamSchema,
  articleQuerySchema,
  CreateArticleSchema,
  UpdateArticleSchema,
} from "@/schemas/article.js";
import express from "express";

const router = express.Router();

router.get("/:articleId", getArticleController);
router.get("/", validate(articleQuerySchema, "query"), getArticlesController);

router.use(authenticate);

// article
router.post(
  "/",
  validate(CreateArticleSchema, "body"),
  requireRole("writer"),
  createArticleController,
);

router.post(
  "/:articleId",
  validate(UpdateArticleSchema, "body"),
  validate(ArticleIdParamSchema, "params"),
  requireRole("writer"),
  updateArticleController,
);

router.delete(
  "/:articleId",
  validate(ArticleIdParamSchema, "params"),
  requireRole("admin", "writer"),
  deleteArticle,
);

export default router;
