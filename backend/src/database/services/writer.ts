import { prisma } from "@/database/db.js";
import { Writer, Post, User } from "@/generated/prisma/client.js";

const createWriter = async (data: {
  userId: string;
  bio?: string;
  avatar?: string;
  website?: string;
}): Promise<Writer> => {
  return await prisma.writer.create({
    data: {
      user_id: data.userId,
      bio: data.bio,
      avatar: data.avatar,
      website: data.website,
    },
  });
};

const getWriter = async (writerId: string): Promise<Writer | null> => {
  return await prisma.writer.findUnique({
    where: { writer_id: writerId },
  });
};

const findWriterByUserId = async (user_id: string): Promise<Writer | null> => {
  return await prisma.writer.findUnique({
    where: { user_id },
  });
};

const getWriterWithPost = async (
  writerId: string,
): Promise<(Writer & { user: User; posts: Post[] }) | null> => {
  return await prisma.writer.findUnique({
    where: { writer_id: writerId },
    include: {
      user: true,
      posts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
};

const getAllWriters = async () => {
  return await prisma.writer.findMany({
    include: {
      user: true,
    },
  });
};

const updateWriter = async (
  writerId: string,
  data: {
    bio?: string;
    avatar?: string;
    website?: string;
  },
): Promise<Writer> => {
  return await prisma.writer.update({
    where: { writer_id: writerId },
    data,
  });
};

const deleteWriter = async (writerId: string): Promise<Writer> => {
  return await prisma.writer.delete({
    where: { writer_id: writerId },
  });
};

export {
  createWriter,
  getWriter,
  getWriterWithPost, // full join
  getAllWriters, // all writers with joins
  updateWriter,
  deleteWriter,
  findWriterByUserId,
};
