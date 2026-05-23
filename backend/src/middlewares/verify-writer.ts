import { findPostById } from "@/database/services/post.js";
import { findWriterByUserId } from "@/database/services/writer.js";
import { postIdParam } from "@/schemas/post.js";
import { NextFunction, Request, Response } from "express";

export const verifyWriter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.user?.user_id;

    const writer = await findWriterByUserId(userId);
    if (!writer) {
      return res
        .status(403)
        .json({ error: "You are not registered as a writer." });
    }

    const { post_id } = req.params.post_id as unknown as postIdParam;

    if (post_id) {
      const existingPost = await findPostById(post_id);
      if (!existingPost) {
        return res.status(404).json({ error: "Post not found." });
      }

      if (existingPost.writer_id !== writer.writer_id) {
        return res
          .status(403)
          .json({ error: "You can only update your own posts." });
      }

      req.post = existingPost;
    }

    req.writer = writer;

    next();
  } catch (error) {
    console.error("Verify writer middleware error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
