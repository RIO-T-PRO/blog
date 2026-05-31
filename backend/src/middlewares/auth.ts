import type { NextFunction, Request, Response } from "express";

import { findUserById } from "@/database/services/user.js";

import { AccessTokenPayload, verifyToken } from "@/utils/token.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // READ TOKEN FROM COOKIE
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({
        error: "Not authorized, no token provided",
      });

      return;
    }

    let decoded: AccessTokenPayload;

    try {
      decoded = verifyToken(token);
    } catch {
      res.status(401).json({
        error: "Not authorized, invalid or expired token",
      });

      return;
    }

    const user = await findUserById(decoded.userId);

    if (!user) {
      res.status(401).json({
        error: "User no longer exists",
      });

      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    res.status(401).json({
      error: "Not authorized, invalid token",
    });
  }
};
