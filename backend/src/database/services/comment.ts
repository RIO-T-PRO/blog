import { prisma } from "@/database/db.js";

const createComment = async (data: {
  content: string;
  status?: string;
  post_id: string;
  user_id: string;
}) => {
  return prisma.comment.create({ data });
};

const updateComment = async (
  comment_id: string,
  data: Partial<{
    content: string;
    status: string;
  }>,
) => {
  return prisma.comment.update({
    where: { comment_id },
    data,
  });
};

const deleteComment = async (comment_id: string) => {
  return prisma.comment.delete({ where: { comment_id } });
};

const findCommentById = async (comment_id: string) => {
  return prisma.comment.findUnique({
    where: { comment_id: comment_id },
    include: { post: true },
  });
};

export { createComment, updateComment, deleteComment, findCommentById };
