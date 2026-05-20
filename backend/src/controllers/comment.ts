import { Request, Response } from "express";
import { findWriterByUserId } from "@/database/services/writer.js";
import { findAdminById } from "@/database/services/admin.js";
import { findPostById } from "@/database/services/post.js";
import {
  createComment as createCommentService,
  updateComment as updateCommentService,
  deleteComment as deleteCommentService,
  findCommentById,
} from "@/database/services/comment.js";
import { errorResponse } from "@/utils/api-response.js";

const createComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = req.user?.user_id;
  if (!userId) return errorResponse(res, 401, "Authentication required.");

  const { post_id, content, status } = req.body;

  if (!post_id || !content) {
    return errorResponse(res, 400, "Post ID and content are required.");
  }

  try {
    const post = await findPostById(post_id);
    if (!post) return errorResponse(res, 404, "Post not found.");

    const newComment = await createCommentService({
      content,
      status: status || "pending",
      post_id,
      user_id: userId,
    });

    return res
      .status(201)
      .json({ status: "success", data: { comment: newComment } });
  } catch (error) {
    console.error("Create comment error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const updateComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = req.user?.user_id;
  const { comment_id } = req.params;

  if (!userId) return errorResponse(res, 401, "Authentication required.");

  if (!comment_id || typeof comment_id !== "string") {
    return errorResponse(res, 400, "Comment ID is required.");
  }

  try {
    const existingComment = await findCommentById(comment_id);
    if (!existingComment) return errorResponse(res, 404, "Comment not found.");

    // Check ownership: comment author or admin
    const isAuthor = existingComment.user_id === userId;
    const isAdmin = await findAdminById(userId);

    if (!isAuthor && !isAdmin) {
      return errorResponse(res, 403, "You can only update your own comments.");
    }

    const updatedComment = await updateCommentService(comment_id, req.body);
    return res
      .status(200)
      .json({ status: "success", data: { comment: updatedComment } });
  } catch (error) {
    console.error("Update comment error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = req.user?.user_id;
  const { comment_id } = req.params;

  if (!userId) return errorResponse(res, 401, "Authentication required.");

  if (!comment_id || typeof comment_id !== "string") {
    return errorResponse(res, 400, "Comment ID is required.");
  }

  try {
    const existingComment = await findCommentById(comment_id);
    if (!existingComment) return errorResponse(res, 404, "Comment not found.");

    const post = await findPostById(existingComment.post_id);
    if (!post) return errorResponse(res, 404, "Associated post not found.");

    const isAuthor = existingComment.user_id === userId;
    const isPostWriter =
      post.writer_id === (await findWriterByUserId(userId))?.writer_id;
    const isAdmin = await findAdminById(userId);

    if (!isAuthor && !isPostWriter && !isAdmin) {
      return errorResponse(
        res,
        403,
        "You don't have permission to delete this comment.",
      );
    }

    await deleteCommentService(comment_id);
    return res
      .status(200)
      .json({ status: "success", message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Delete comment error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const getComment = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user?.user_id;
  const { comment_id } = req.params;

  if (!userId) return errorResponse(res, 401, "Authentication required.");

  if (!comment_id || typeof comment_id !== "string") {
    return errorResponse(res, 400, "Comment ID is required.");
  }

  try {
    const comment = await findCommentById(comment_id);
    if (!comment) return errorResponse(res, 404, "Comment not found.");

    const post = await findPostById(comment.post_id);
    if (!post) return errorResponse(res, 404, "Post not found.");

    const isAuthor = comment.user_id === userId;
    const isPostWriter =
      post.writer_id === (await findWriterByUserId(userId))?.writer_id;
    const isAdmin = await findAdminById(userId);

    // Anyone can see approved comments, but only author/writer/admin can see pending/spam comments
    if (comment.status === "approved" || isAuthor || isPostWriter || isAdmin) {
      return res.status(200).json({ status: "success", data: { comment } });
    }

    return errorResponse(
      res,
      403,
      "You don't have permission to view this comment.",
    );
  } catch (error) {
    console.error("Get comment error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

export { createComment, updateComment, deleteComment, getComment };
