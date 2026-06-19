import { resError } from "@/utils/response.js";
import { NextFunction, Request, Response } from "express";

type Roles = "admin" | "writer" | "user";

export const requireRole = (...allowedRoles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return resError(res, "Authentication required", 401);
      }

      const hasRole = allowedRoles.some((role) =>
        req.user.roles.includes(role),
      );

      if (!hasRole) {
        return resError(res, "Insufficient permissions", 403);
      }

      next();
    } catch (error) {
      console.error("Authorization error", error);
      return resError(res, "Internal Server error", 500);
    }
  };
};
