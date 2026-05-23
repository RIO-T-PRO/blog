import { Router } from "express";
import { validate } from "@/middlewares/validate.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { verifyWriter } from "@/middlewares/verify-writer.js";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
} from "@/controllers/post.js";
import {
  createPostSchema,
  postIdParamSchema,
  updatePostSchema,
} from "@/schemas/post.js";

const router = Router();

router.get("/:post_id", validate(postIdParamSchema, "params"), getPost);

router.post(
  "/",
  authMiddleware,
  validate(createPostSchema, "body"),
  verifyWriter,
  createPost,
);

router.put(
  "/",
  authMiddleware,
  validate(updatePostSchema, "body"),
  verifyWriter,
  updatePost,
);

router.delete("/", authMiddleware, verifyWriter, deletePost);

export default router;
