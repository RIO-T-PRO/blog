import { prisma } from "../db.js";
import { Article, ArticleStatus } from "@/generated/prisma/client.js";

export type CreateArticleData = {
  authorId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  status?: ArticleStatus;
  publishedAt?: Date | null;
};

export type UpdateArticleData = Partial<{
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  status: ArticleStatus;
  publishedAt: Date | null;
}>;

export const createArticle = async (
  data: CreateArticleData,
): Promise<Article> => {
  return prisma.article.create({
    data,
  });
};

export const getArticleById = async (id: string) => {
  return prisma.article.findUnique({
    where: { id },
  });
};

export const getArticleBySlug = async (slug: string) => {
  return prisma.article.findUnique({
    where: { slug },
    include: {
      author: {
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

export const listArticles = async (params?: {
  status?: ArticleStatus;
  search?: string;
  authorId?: string;
  skip?: number;
  take?: number;
}) => {
  const { status, search, authorId, skip = 0, take = 10 } = params ?? {};

  return prisma.article.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(authorId ? { authorId } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { excerpt: { contains: search, mode: "insensitive" } },
              { content: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take,
    include: {
      author: {
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

export const updateArticle = async (
  id: string,
  data: UpdateArticleData,
): Promise<Article> => {
  return prisma.article.update({
    where: { id },
    data,
  });
};

export const deleteArticle = async (id: string): Promise<Article> => {
  return prisma.article.delete({
    where: { id },
  });
};
