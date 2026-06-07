// src/routes/post.routes.ts
import { Router } from "express";
import { validate } from "@/middlewares/validate.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { verifyWriter } from "@/middlewares/verify-writer.js";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
} from "@/controllers/post.js";

import {
  createPostSchema,
  postIdParamSchema,
  updatePostSchema,
} from "@/schemas/post.js";

const router = Router();

router.use(authMiddleware);

router.get("/", verifyWriter, getPosts);

// Get single post – verifyWriter will load the post and set permissions
router.get(
  "/:postId",
  validate(postIdParamSchema, "params"),
  verifyWriter,
  getPost,
);

// Create post
router.post("/", validate(createPostSchema, "body"), verifyWriter, createPost);

// Update post
router.put(
  "/:postId",
  validate(postIdParamSchema, "params"),
  validate(updatePostSchema, "body"),
  verifyWriter,
  updatePost,
);

// Delete post
router.delete(
  "/:postId",
  validate(postIdParamSchema, "params"),
  verifyWriter,
  deletePost,
);

export default router;
