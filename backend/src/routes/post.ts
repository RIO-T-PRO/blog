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

router.use(authMiddleware);

router.get(
  "/:postId",
  validate(postIdParamSchema, "params"),
  verifyWriter,
  getPost,
);

router.post("/", validate(createPostSchema, "body"), verifyWriter, createPost);

router.put(
  "/:postId",
  validate(postIdParamSchema, "params"),
  validate(updatePostSchema, "body"),
  verifyWriter,
  updatePost,
);

router.delete(
  "/:postId",
  validate(postIdParamSchema, "params"),
  verifyWriter,
  deletePost,
);

export default router;
