import { prisma } from "../db.js";
import { Comment } from "@/generated/prisma/client.js";

export type CreateCommentData = {
  articleId: string;
  userId: string;
  content: string;
  parentId?: string | null;
};

export type UpdateCommentData = {
  content: string;
};

export const createComment = async (
  data: CreateCommentData,
): Promise<Comment> => {
  return prisma.comment.create({
    data,
  });
};

export const getCommentById = async (id: string) => {
  return prisma.comment.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          profile: {
            select: {
              username: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });
};

export const listCommentsByArticle = async (articleId: string) => {
  return prisma.comment.findMany({
    where: {
      articleId,
      active: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          profile: {
            select: {
              username: true,
              avatarUrl: true,
            },
          },
        },
      },
      replies: {
        where: { active: true },
        orderBy: { createdAt: "asc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  username: true,
                  avatarUrl: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const updateComment = async (
  id: string,
  data: UpdateCommentData,
): Promise<Comment> => {
  return prisma.comment.update({
    where: { id },
    data,
  });
};

export const hideComment = async (id: string): Promise<Comment> => {
  return prisma.comment.update({
    where: { id },
    data: { active: false },
  });
};
