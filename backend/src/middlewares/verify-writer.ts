import { findAdminById } from "@/database/services/admin.js";
import { findPostById } from "@/database/services/post.js";
import { findWriterByUserId } from "@/database/services/writer.js";
import { postIdParam } from "@/schemas/post.js";
import { WriterIdParam } from "@/schemas/writer.js";
import { NextFunction, Request, Response } from "express";

export const verifyWriter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.user?.user_id;

    const writer = await findWriterByUserId(userId);
    if (!writer)
      return res
        .status(403)
        .json({ error: "You are not registered as a writer." });

    const { postId } = req.params as unknown as postIdParam;

    if (postId) {
      const existingPost = await findPostById(postId);
      if (!existingPost) {
        return res.status(404).json({ error: "Post not found." });
      }

      if (existingPost.writer_id !== writer.writer_id) {
        return res
          .status(403)
          .json({ error: "You can only update your own posts." });
      }

      const admin = await findAdminById(userId);

      req.post = existingPost;
      req.permissions = {
        isOwner: true,
        isAdmin: admin?.role === "ADMIN" ? true : false,
      };
    }

    req.writer = writer;
    next();
  } catch (error) {
    console.error("Verify writer middleware error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const ensureNotWriter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const user_id = req.user.user_id;
    const writer = await findWriterByUserId(user_id);

    if (writer) {
      return res.status(409).json({
        status: "error",
        message: "You are already a writer.",
      });
    }

    next();
  } catch (error) {
    console.error("Writer middleware error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
