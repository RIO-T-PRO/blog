import { Admin, User, Writer } from "@/generated/prisma/client.ts";

declare global {
  namespace Express {
    interface Request {
      admin: Admin;
      user: User;
      writer: Writer;
    }
  }
}

export {};
