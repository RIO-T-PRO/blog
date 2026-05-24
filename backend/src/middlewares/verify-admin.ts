import { findAdminById, getAdminByUserId } from "@/database/services/admin.js";
import { findWriterByUserId } from "@/database/services/writer.js";
import { WriterIdParam } from "@/schemas/writer.js";
import { NextFunction, Request, Response } from "express";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.user?.user_id;
    if (!userId) {
      return res.status(401).json({ error: "Authentication required." });
    }

    const admin = await getAdminByUserId(userId);
    if (!admin) {
      return res
        .status(403)
        .json({ error: "You are not registered as an admin." });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Verify admin middleware error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// for delte/revoke writer
export const isAdminOrWriterOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.user?.user_id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { writerId } = req.params as WriterIdParam;

    if (!writerId) {
      return res.status(400).json({ error: "Writer ID is required." });
    }

    const targetWriter = await findWriterByUserId(writerId);
    if (!targetWriter) {
      return res.status(404).json({ error: "Writer not found." });
    }

    const isAdmin = await findAdminById(userId);
    const isOwner = targetWriter.user_id === userId;

    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json({ error: "Forbidden: You are not the owner nor an admin." });
    }

    req.writer = targetWriter;
    next();
  } catch (error) {
    console.error("isAdminOrWriterOwner error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
