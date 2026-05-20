import { prisma } from "@/database/db.js";
import { Writer, Post, User } from "@/generated/prisma/client.js";

const createWriter = async (data: {
  writer_id: string;
  user_id: string;
  website?: string;
}) => {
  return prisma.writer.create({ data });
};

const updateWriter = async (
  writer_id: string,
  data: Partial<{
    website: string;
  }>,
) => {
  return prisma.writer.update({
    where: { writer_id },
    data,
  });
};

const deleteWriter = async (writer_id: string) => {
  return prisma.writer.delete({ where: { writer_id } });
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

export {
  createWriter,
  updateWriter,
  deleteWriter,
  findWriterByUserId,
  getWriter,
};
