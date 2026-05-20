import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  getComment,
} from "@/controllers/comment.js";
import { authMiddleware } from "@/middlewares/auth.js";

const router = Router();

router.get("/:comment_id", authMiddleware, getComment);

router.post("/", authMiddleware, createComment);
router.put("/:comment_id", authMiddleware, updateComment);
router.delete("/:comment_id", authMiddleware, deleteComment);

export default router;
