import { Router } from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
} from "@/controllers/post.js";
import { authMiddleware } from "@/middlewares/auth.js";

const router = Router();

router.get("/:postId", authMiddleware, getPost);

router.post("/", authMiddleware, createPost);
router.put("/:post_id", authMiddleware, updatePost);
router.delete("/:post_id", authMiddleware, deletePost);

export default router;
