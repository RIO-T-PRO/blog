import { Request, Response } from "express";
import {
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService,
  findPosts,
  findPostBySlug,
} from "@/database/services/post.js";
import { Prisma } from "@/generated/prisma/client.js";
import { postIdParam, updatePostBody } from "@/schemas/post.js";

const createPost = async (req: Request, res: Response) => {
  try {
    const { writer } = req;
    const postData = req.body;

    const newPost = await createPostService({
      ...postData,
      writer_id: writer.writer_id,
    });

    return res.status(201).json({
      status: "success",
      data: { post: newPost },
    });
  } catch (err) {
    console.error("createPost error:", err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "error",
          message: "Slug already exists.",
        });
      }
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

const getPost = async (req: Request, res: Response) => {
  const { post, permissions } = req;
  const { isOwner, isAdmin } = permissions!;

  if (isOwner || isAdmin) {
    return res.status(200).json({
      status: "success",
      data: { post },
    });
  }

  return res.status(403).json({
    error: "You don't have permission to view this post",
  });
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const { writer } = req; // set by verifyWriter

    const result = await findPosts({
      page,
      limit,
      writer_id: writer?.writer_id, // only return writer's own posts
    });

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.error("getPosts error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const existingPost = req.post;
    const updateData = req.body as updatePostBody;
    const { isOwner, isAdmin } = req.permissions!;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        status: "error",
        message: "You are not allowed to update this post",
      });
    }

    if (updateData.slug && updateData.slug !== existingPost.slug) {
      const slugConflict = await findPostBySlug(updateData.slug);
      if (slugConflict && slugConflict.post_id !== existingPost.post_id) {
        return res.status(409).json({
          status: "error",
          message: "Slug already exists. Please choose another slug.",
        });
      }
    }

    const updatedPost = await updatePostService(
      existingPost.post_id,
      updateData,
    );

    return res.status(200).json({
      status: "success",
      data: { post: updatedPost },
    });
  } catch (err) {
    console.error("updatePost error:", err);

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res.status(409).json({
        status: "error",
        message: "Slug already exists.",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params as postIdParam;
    const { isOwner, isAdmin } = req.permissions!;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        status: "error",
        message: "You are not allowed to delete this post",
      });
    }

    await deletePostService(postId);

    return res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.error("deletePost error:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export { createPost, updatePost, deletePost, getPost, getPosts };
