import type { writer, user } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: user;
      writer: writer;
    }
  }
}

export {};
