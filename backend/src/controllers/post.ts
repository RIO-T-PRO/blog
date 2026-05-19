import { Request, Response } from "express";
import { findWriterByUserId } from "@/database/services/writer.js";
import {
  findPostById,
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from "@/database/services/post.js";
import { errorResponse } from "@/utils/api-response.js";
import { findAdminById } from "@/database/services/admin.js";

const createPost = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user?.user_id;
  if (!userId) return errorResponse(res, 401, "Authentication required.");

  const writer = await findWriterByUserId(userId);
  if (!writer)
    return errorResponse(res, 403, "You are not registered as a writer.");

  const { title, slug, excerpt, content, cover_image, published } = req.body;
  if (!title || !content)
    return errorResponse(res, 400, "Title and content are required.");

  try {
    const newPost = await createPostService({
      title,
      slug,
      excerpt,
      content,
      cover_image,
      published,
      writer_id: writer.writer_id,
    });
    return res.status(201).json({ status: "success", data: { post: newPost } });
  } catch (error) {
    console.error("Create post error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const updatePost = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user?.user_id;
  const { post_id } = req.params;
  if (!userId) return errorResponse(res, 401, "Authentication required.");

  const writer = await findWriterByUserId(userId);
  if (!writer)
    return errorResponse(res, 403, "You are not registered as a writer.");

  try {
    if (typeof post_id !== "string")
      return errorResponse(res, 400, "Post ID is required");

    const existingPost = await findPostById(post_id);

    if (!existingPost) return errorResponse(res, 404, "Post not found.");

    if (existingPost.writer_id !== writer.writer_id) {
      return errorResponse(res, 403, "You can only update your own posts.");
    }

    const updatedPost = await updatePostService(post_id, req.body);
    return res
      .status(200)
      .json({ status: "success", data: { post: updatedPost } });
  } catch (error) {
    console.error("Update post error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const deletePost = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user?.user_id;
  const { post_id } = req.params;
  if (!userId) return errorResponse(res, 401, "Authentication required.");

  const writer = await findWriterByUserId(userId);
  if (!writer)
    return errorResponse(res, 403, "You are not registered as a writer.");

  try {
    if (typeof post_id !== "string")
      return errorResponse(res, 400, "Post ID is required");

    const existingPost = await findPostById(post_id);
    if (!existingPost) return errorResponse(res, 404, "Post not found.");

    if (existingPost.writer_id !== writer.writer_id) {
      return errorResponse(res, 403, "You can only delete your own posts.");
    }

    await deletePostService(post_id);
    return res
      .status(200)
      .json({ status: "success", message: "Post deleted successfully." });
  } catch (error) {
    console.error("Delete post error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const getPost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;
    const { postId } = req.params;

    if (!userId) {
      return errorResponse(res, 401, "Authentication required.");
    }

    if (!postId || typeof postId !== "string") {
      return errorResponse(res, 400, "Post ID is required.");
    }

    const post = await findPostById(postId);

    if (!post) {
      return errorResponse(res, 404, "Post not found.");
    }

    if (post.published) {
      return res.status(200).json({ post });
    }

    const admin = await findAdminById(userId);

    if (admin) {
      return res.status(200).json({ data: post });
    }

    const writer = await findWriterByUserId(userId);

    if (writer && post.writer_id === writer.writer_id) {
      return res.status(200).json({ data: post });
    }

    return errorResponse(
      res,
      403,
      "You don't have permission to view this post.",
    );
  } catch (error) {
    console.error("Get post error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

export { createPost, updatePost, deletePost, getPost };
