import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.js";
import { writerMiddleware } from "@/middlewares/writer.js";
import {
  createPost,
  deletePost,
  updatePost,
  updateWriter,
} from "@/controllers/writer.js";
import { getWriter } from "@/controllers/admin.js";

const router = Router();

// Writer profile
router.get("/:userId", getWriter);
router.put("/update", authMiddleware, writerMiddleware, updateWriter);

// Posts
router.post("/post/create", authMiddleware, writerMiddleware, createPost);
router.put(
  "/post/update/:post_id",
  authMiddleware,
  writerMiddleware,
  updatePost,
);
router.delete(
  "/post/delete/:post_id",
  authMiddleware,
  writerMiddleware,
  deletePost,
);

export default router;
