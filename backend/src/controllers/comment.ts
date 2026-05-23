import { Request, Response } from "express";
import {
  createComment as createCommentService,
  updateComment as updateCommentService,
  deleteComment as deleteCommentService,
} from "@/database/services/comment.js";
import { findPostById } from "@/database/services/post.js";
import { CommentIdParam, UpdateCommentBody } from "@/schemas/comment.js";

const createComment = async (req: Request, res: Response) => {
  const userId = req.user?.user_id;
  if (!userId) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const { post_id, content, status } = req.body;

  const post = await findPostById(post_id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const newComment = await createCommentService({
    content,
    status,
    post_id,
    user_id: userId,
  });

  return res
    .status(201)
    .json({ status: "success", data: { comment: newComment } });
};

const updateComment = async (req: Request, res: Response) => {
  const { isAuthor, isAdmin } = req.permissions!;
  if (!isAuthor && !isAdmin) {
    return res
      .status(403)
      .json({ error: "You can only update your own comments" });
  }

  const { comment_id } = req.params as CommentIdParam;
  const data = req.body as UpdateCommentBody;

  const updatedComment = await updateCommentService(comment_id, data);
  return res
    .status(200)
    .json({ status: "success", data: { comment: updatedComment } });
};

const deleteComment = async (req: Request, res: Response) => {
  const { isAuthor, isAdmin, isPostWriter } = req.permissions!;
  if (!isAuthor && !isPostWriter && !isAdmin) {
    return res
      .status(403)
      .json({ error: "You don't have permission to delete this comment" });
  }

  const { comment_id } = req.params as CommentIdParam;

  await deleteCommentService(comment_id);
  return res
    .status(200)
    .json({ status: "success", message: "Comment deleted successfully" });
};

const getComment = async (req: Request, res: Response) => {
  const { comment, permissions } = req;
  const { isAuthor, isAdmin, isPostWriter } = permissions!;

  if (comment.status === "approved" || isAuthor || isAdmin || isPostWriter) {
    return res.status(200).json({ status: "success", data: { comment } });
  }

  return res
    .status(403)
    .json({ error: "You don't have permission to view this comment" });
};

export { createComment, updateComment, getComment, deleteComment };
