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
// single post
router.get("/:postId", validate(postIdParamSchema, "params"), getPost);

// create
router.post("/", validate(createPostSchema, "body"), verifyWriter, createPost);

// update
router.put(
  "/:postId",
  validate(postIdParamSchema, "params"),
  validate(updatePostSchema, "body"),
  verifyWriter,
  updatePost,
);

// delete
router.delete(
  "/:postId",
  validate(postIdParamSchema, "params"),
  verifyWriter,
  deletePost,
);

export default router;
