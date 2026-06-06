import { prisma } from "@/database/db.js";
import { Post } from "@/generated/prisma/client.js";

const findPostById = async (postId: string): Promise<Post | null> => {
  return prisma.post.findUnique({
    where: { post_id: postId },
  });
};

const findPosts = async (params: {
  page: number;
  limit: number;
  writer_id?: string;
}) => {
  const { page, limit, writer_id } = params;

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: writer_id ? { writer_id } : undefined,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),

    prisma.post.count({
      where: writer_id ? { writer_id } : undefined,
    }),
  ]);

  return {
    posts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

const createPost = async (data: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  published?: boolean;
  publishedAt?: Date;
  writer_id: string;
}) => {
  return prisma.post.create({ data });
};

const updatePost = async (
  post_id: string,
  data: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    published: boolean;
    publishedAt: Date;
  }>,
) => {
  return prisma.post.update({
    where: { post_id },
    data,
  });
};

const deletePost = async (post_id: string) => {
  return prisma.post.delete({ where: { post_id } });
};

export { findPostById, findPosts, createPost, updatePost, deletePost };
