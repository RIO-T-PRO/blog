import { prisma } from "@/database/db.js";
import { Post } from "@/generated/prisma/client.js";

const findPostById = async (postId: string): Promise<Post | null> => {
  return prisma.post.findUnique({
    where: { post_id: postId },
  });
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

export { findPostById, createPost, updatePost, deletePost };
