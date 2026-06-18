import { hasRole } from "@/database/services/user.js";
import { resError } from "@/utils/response.js";
import { NextFunction, Request, Response } from "express";

export const requireRole = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return resError(res, "Authentication required", 401);
    }

    const authorized = await hasRole(req.user.id, allowedRoles);

    if (!authorized) {
      return resError(res, "Insufficient permissions", 403);
    }

    next();
  };
};
