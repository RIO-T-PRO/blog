import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/token.js";
import { findUserById, findUserWithRole } from "@/database/services/user.js";
import { TokenPayload } from "@/types/token.js";
import { resError } from "@/utils/index.js";
import { getUserProfile } from "@/database/services/profile.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return resError(res, "accessToken missing", 401);
    }

    const accessToken = authHeader.split(" ")[1];

    const decoded = verifyToken("access", accessToken) as TokenPayload;

    if (!decoded.id) {
      return resError(res, "Invalid accessToken", 401);
    }

    const user = await findUserWithRole(decoded.id);

    if (!user) {
      return resError(res, "Unauthorized", 401);
    }

    req.user = user;

    return next();
  } catch (error) {
    console.error("Unauthorized", error);
    return resError(res, "Unauthorized", 401);
  }
};
