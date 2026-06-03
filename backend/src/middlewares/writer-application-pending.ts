import { Request, Response, NextFunction } from "express";

import { prisma } from "@/database/db.js";
import { findApplicationByUserId } from "@/database/services/writer-application.js";

export const ensureNoWriterApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.user.user_id;
    const application = await findApplicationByUserId(userId);

    if (application) {
      return res.status(409).json({
        status: "error",
        message: "Application already submitted.",
      });
    }

    next();
  } catch (error) {
    console.error("Application middleware error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
