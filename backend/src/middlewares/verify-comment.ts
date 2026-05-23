import { findAdminById } from "@/database/services/admin.js";
import { findCommentById } from "@/database/services/comment.js";
import { findPostById } from "@/database/services/post.js";
import { findWriterByUserId } from "@/database/services/writer.js";
import { CommentIdParam } from "@/schemas/comment.js";
import { NextFunction, Request, Response } from "express";

export const commentPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { comment_id } = req.params as CommentIdParam;
  if (!comment_id) {
    return res.status(400).json({ error: "Comment ID required" });
  }

  const comment = await findCommentById(comment_id);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  const post = await findPostById(comment.post_id);
  if (!post) {
    return res.status(404).json({ error: "Associated post not found" });
  }

  const userId = req.user?.user_id;
  let isAuthor = false;
  let isAdmin = false;
  let isPostWriter = false;

  if (userId) {
    isAuthor = comment.user_id === userId;
    isAdmin = !!(await findAdminById(userId));
    const writer = await findWriterByUserId(userId);
    isPostWriter = writer ? post.writer_id === writer.writer_id : false;
  }

  req.comment = comment;
  req.post = post;
  req.permissions = { isAuthor, isAdmin, isPostWriter };
  next();
};
