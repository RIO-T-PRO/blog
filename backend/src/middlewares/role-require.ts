import { NextFunction, Request, Response } from "express";

export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const hasRole = allowedRoles.some((role) => req.user.roles.includes(role));

    if (!hasRole) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  };
};
