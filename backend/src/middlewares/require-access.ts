import { NextFunction, Request, Response } from "express";
import { authorize, resError } from "@/utils/index.js";
import { Action } from "@/types/auth.js";

export const requireAccess = (resourceName: string, action: Action) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return resError(res, "Unauthorized", 401);
    }

    const subject = req.resource ?? req.body;

    const allowed = await authorize({
      user: req.user,
      resourceName,
      action,
      resource: subject,
    });

    if (!allowed) {
      return resError(res, "Forbidden", 403);
    }

    next();
  };
};
