import {
  findWriterByUserId,
  updateWriter as updateWriterService,
} from "@/database/services/writer.js";
import { Request, Response } from "express";
import {
  findPostById,
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from "@/database/services/post.js";
import { errorResponse } from "@/utils/api-response.js";

const updateWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return errorResponse(res, 401, "Authentication required.");
    }

    const writer = await findWriterByUserId(userId);

    if (!writer) {
      return errorResponse(res, 404, "Writer profile not found for this user.");
    }

    const { bio, avatar, website } = req.body;

    if (!bio && !avatar && !website) {
      return errorResponse(
        res,
        400,
        "At least one field (bio, avatar, website) must be provided.",
      );
    }

    const updatedWriter = await updateWriterService(writer.writer_id, {
      bio,
      avatar,
      website,
    });

    return res.status(200).json({
      status: "success",
      message: "Updated successfully.",
      data: { writer: updatedWriter },
    });
  } catch (error) {
    console.error("Update writer error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const createPost = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user?.user_id;

  if (!userId) {
    return errorResponse(res, 401, "Authentication required.");
  }

  const writer = await findWriterByUserId(userId);
  if (!writer) {
    return errorResponse(res, 403, "You are not registered as a writer.");
  }

  const { title, slug, excerpt, content, cover_image, published } = req.body;

  if (!title || !content) {
    return errorResponse(res, 400, "Title and content are required.");
  }

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

    return res.status(201).json({
      status: "success",
      data: { post: newPost },
    });
  } catch (error) {
    console.error("Create post error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const updatePost = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user?.user_id;
  const { post_id } = req.params;

  if (!userId) {
    return errorResponse(res, 401, "Authentication required.");
  }

  const writer = await findWriterByUserId(userId);
  if (!writer) {
    return errorResponse(res, 403, "You are not registered as a writer.");
  }

  if (!post_id || typeof post_id !== "string") {
    return errorResponse(res, 400, "Post ID is required.");
  }

  const updateData = req.body;

  try {
    const existingPost = await findPostById(post_id);
    if (!existingPost) {
      return errorResponse(res, 404, "Post not found.");
    }

    if (existingPost.writer_id !== writer.writer_id) {
      return errorResponse(res, 403, "You can only update your own posts.");
    }

    const updatedPost = await updatePostService(post_id, updateData);

    return res.status(200).json({
      status: "success",
      data: { post: updatedPost },
    });
  } catch (error) {
    console.error("Update post error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const deletePost = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user?.user_id;
  const { post_id } = req.params;

  if (!userId) {
    return errorResponse(res, 401, "Authentication required.");
  }

  const writer = await findWriterByUserId(userId);
  if (!writer) {
    return errorResponse(res, 403, "You are not registered as a writer.");
  }

  if (!post_id || typeof post_id !== "string") {
    return errorResponse(res, 400, "Post ID is required.");
  }

  try {
    const existingPost = await findPostById(post_id);
    if (!existingPost) {
      return errorResponse(res, 404, "Post not found.");
    }

    if (existingPost.writer_id !== writer.writer_id) {
      return errorResponse(res, 403, "You can only delete your own posts.");
    }

    await deletePostService(post_id);

    return res.status(200).json({
      status: "success",
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

export { updateWriter, createPost, updatePost, deletePost };
