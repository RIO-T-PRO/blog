import { prisma } from "@/database/db.js";
import { Writer } from "@/generated/prisma/client.js";

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

const getAllWriters = async (): Promise<Writer[]> => {
  return await prisma.writer.findMany();
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
    data: {
      bio: data.bio,
      avatar: data.avatar,
      website: data.website,
    },
  });
};

const deleteWriter = async (writerId: string): Promise<Writer> => {
  return await prisma.writer.delete({
    where: { writer_id: writerId },
  });
};

export { createWriter, getWriter, getAllWriters, updateWriter, deleteWriter };
