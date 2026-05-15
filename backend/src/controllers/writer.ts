import {
  findWriterByUserId,
  getWriter as getWriterService,
  updateWriter as updateWriterService,
} from "@/database/services/writer.js";
import { Request, Response } from "express";
import {
  findPostById,
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from "@/database/services/post.js";

const updateWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;
    const writerId = req.writer?.writer_id;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required." });
    }

    if (!writerId) {
      return res
        .status(400)
        .json({ error: "Writer profile not found in request context." });
    }

    const { bio, avatar, website } = req.body;
    if (!bio && !avatar && !website) {
      return res.status(400).json({
        error: "At least one field (bio, avatar, website) must be provided.",
      });
    }

    const existingWriter = await getWriterService(writerId);

    if (!existingWriter) {
      return res.status(404).json({ error: "Writer profile not found." });
    }

    if (existingWriter.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this profile." });
    }

    const updatedWriter = await updateWriterService(writerId, {
      bio,
      avatar,
      website,
    });
    return res.status(200).json({
      message: "Updated successfully.",
      data: { writer: updatedWriter },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const createPost = async (req: Request, res: Response) => {
  const userId = req.user?.user_id;

  if (!userId) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required",
    });
  }

  const writer = await findWriterByUserId(userId);

  if (!writer) {
    return res.status(403).json({
      status: "error",
      message: "You are not registered as a writer",
    });
  }

  const { title, slug, excerpt, content, cover_image, published } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      status: "error",
      message: "Title and content are required",
    });
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
    console.error("Full error details:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Stack trace:", error.stack);
    }
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  const userId = req.user?.user_id;
  const { post_id } = req.params;

  if (!userId) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  const writer = await findWriterByUserId(userId);

  if (!writer) {
    return res.status(403).json({
      message: "You are not registered as a writer",
    });
  }

  if (!post_id || typeof post_id !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Post ID is required",
    });
  }

  const updateData = req.body; // includes any of: title, slug, excerpt, content, cover_image, published

  try {
    const existingPost = await findPostById(post_id);

    if (!existingPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (existingPost.writer_id !== writer.writer_id) {
      return res.status(403).json({
        message: "You can only update your own posts",
      });
    }

    console.log("Calling service with:", {
      post_id,
      updateData,
      existingPostId: existingPost.post_id,
      existingPostSlug: existingPost.slug,
    });

    const updatedPost = await updatePostService(
      post_id,
      updateData,
      existingPost,
    );

    return res.status(200).json({
      status: "success",
      data: { post: updatedPost },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  const userId = req.user?.user_id;
  const { post_id } = req.params;

  if (!userId) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required",
    });
  }

  const writer = await findWriterByUserId(userId);
  if (!writer) {
    return res.status(403).json({
      status: "error",
      message: "You are not registered as a writer",
    });
  }

  if (!post_id || typeof post_id !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Post ID is required",
    });
  }

  try {
    const existingPost = await findPostById(post_id);
    if (!existingPost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    if (existingPost.writer_id !== writer.writer_id) {
      return res.status(403).json({
        status: "error",
        message: "You can only delete your own posts",
      });
    }

    await deletePostService(post_id);

    return res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { updateWriter, createPost, updatePost, deletePost };
