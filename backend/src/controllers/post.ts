import { Request, Response } from "express";
import {
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService,
  findPosts,
} from "@/database/services/post.js";
import { Prisma } from "@/generated/prisma/client.js";
import { postIdParam, updatePostBody } from "@/schemas/post.js";

const getPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    const { writer } = req;

    const result = await findPosts({
      page,
      limit,
      writer_id: writer?.writer_id, // writer only sees own posts
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

const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params as postIdParam;
    const updateData = req.body as updatePostBody;

    const updatedPost = await updatePostService(postId, updateData);

    return res.status(200).json({
      status: "success",
      data: { post: updatedPost },
    });
  } catch (err) {
    console.error("updatePost error:", err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "error",
          message: "Slug already exists.",
        });
      }
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params as postIdParam;

  await deletePostService(postId);

  return res.status(200).json({
    status: "success",
    message: "Post deleted successfully",
  });
};

// your existing getPost stays unchanged
const getPost = async (req: Request, res: Response) => {
  const { post, permissions } = req;
  const { isOwner, isAdmin } = permissions!;

  if (post.published || isOwner || isAdmin) {
    return res.status(200).json({
      status: "success",
      data: { post },
    });
  }

  return res.status(403).json({
    error: "You don't have permission to view this post",
  });
};

export { findPosts, createPost, updatePost, deletePost, getPost, getPosts };
