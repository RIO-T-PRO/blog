import { getPostBySlug, getPosts } from "@/controllers/landing-page.js";
import { Router } from "express";

const router = Router();

// published posts
router.get("/posts", getPosts);
router.get("/posts/:slug", getPostBySlug);

export default router;
