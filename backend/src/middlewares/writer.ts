import { Request, Response, NextFunction } from "express";
import { findWriterByUserId } from "@/database/services/writer.js";

export const writerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const writer = await findWriterByUserId(req.user.user_id);
    console.log("writer is undefined", writer);

    if (!writer) {
      res.status(403).json({ error: "User does not exist" });
      return;
    }

    req.writer = writer;
    next();
  } catch (error) {
    console.error("Writer middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
