import { Request } from "express";

export interface AuthUser {
  id: string;
  roles: string[];
}

declare global {
  namespace Express {
    interface Request {
      user: AuthUser;
      resource: unknown;
    }
  }
}

export {};
