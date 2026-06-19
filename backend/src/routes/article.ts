import {
  getArticleController,
  getArticlesController,
} from "@/controllers/article.js";
import express from "express";

const router = express.Router();

router.get("/article/:articleId", getArticleController);
router.get("/articles", getArticlesController);

export default router;
