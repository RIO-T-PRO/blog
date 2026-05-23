import {
  Admin,
  User,
  UserProfile,
  Writer,
  Comment,
  Post,
} from "@/generated/prisma/client.ts";

declare global {
  namespace Express {
    interface Request {
      admin: Admin;
      user: User;
      writer: Writer;
      profile: UserProfile;
      comment: Comment;
      post: Post;
      permissions?: {
        isAuthor?: boolean;
        isAdmin: ?boolean;
        isPostWriter?: boolean;
        isOwner?: boolean;
      };
    }
  }
}

export {};
