import {
  getPublishedPostBySlug,
  getPublishedPosts,
} from "@/database/services/landing-page.js";
import { slugParamId } from "@/schemas/user.schema.js";
import { Request, Response } from "express";

const getPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    const result = await getPublishedPosts(page, limit);

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Landing get posts error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch posts for landing page",
    });
  }
};

const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params as slugParamId;

    const post = await getPublishedPostBySlug(slug);

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found or not published",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (error) {
    console.error("Landing get post by slug error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch the post",
    });
  }
};

export { getPosts, getPostBySlug };
