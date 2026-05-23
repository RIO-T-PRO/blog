import { Router } from "express";
import { validate } from "@/middlewares/validate.js";
import {
  commentIdParamSchema,
  createCommentBodySchema,
  updateCommentBodySchema,
} from "@/schemas/comment.js";
import { commentPermissions } from "@/middlewares/verify-comment.js";
import {
  createComment,
  updateComment,
  deleteComment,
  getComment,
} from "@/controllers/comment.js";
import { authMiddleware } from "@/middlewares/auth.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/comments",
  validate(createCommentBodySchema, "body"),
  createComment,
);

router.get(
  "/comments/:comment_id",
  validate(commentIdParamSchema, "params"),
  commentPermissions,
  getComment,
);

router.put(
  "/comments/:comment_id",
  validate(commentIdParamSchema, "params"),
  validate(updateCommentBodySchema, "body"),
  commentPermissions,
  updateComment,
);
router.delete(
  "/comments/:comment_id",
  validate(commentIdParamSchema, "params"),
  commentPermissions,
  deleteComment,
);

export default router;
