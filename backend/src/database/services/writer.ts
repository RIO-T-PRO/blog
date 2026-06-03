import { prisma } from "@/database/db.js";
import { Writer, Post, User } from "@/generated/prisma/client.js";

interface GetWriterDashboardParams {
  writer_id: string;
  page?: number;
  limit?: number;
}

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
    include: {
      user: {
        select: {
          user_id: true,
          fullname: true,
          email: true,
        },
      },
    },
  });
};

const findWriterByUserId = async (user_id: string): Promise<Writer | null> => {
  return await prisma.writer.findUnique({
    where: { user_id },
  });
};

const promoteToWriter = async (userId: string): Promise<Writer> => {
  const existingWriter = await prisma.writer.findUnique({
    where: { user_id: userId },
  });

  if (existingWriter) {
    throw new Error("User is already a writer.");
  }

  return prisma.writer.create({
    data: {
      user: {
        connect: {
          user_id: userId,
        },
      },
    },
    include: {
      user: {
        select: {
          user_id: true,
          fullname: true,
          email: true,
        },
      },
    },
  });
};

const getWriterDashboard = async ({
  writer_id,
  page = 1,
  limit = 10,
}: GetWriterDashboardParams) => {
  const skip = (page - 1) * limit;

  const writerData = await prisma.writer.findUnique({
    where: { writer_id: writer_id },
    include: {
      user: {
        select: {
          fullname: true,
          email: true,
          userProfile: { select: { bio: true, avatar: true } },
        },
      },
      posts: {
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          comments: {
            take: 10,
            orderBy: { createdAt: "desc" },
            include: {
              user: {
                select: {
                  fullname: true,
                  userProfile: { select: { avatar: true } },
                },
              },
            },
          },
          _count: { select: { comments: true } },
        },
      },
    },
  });

  const totalPosts = await prisma.post.count({ where: { writer_id } });

  return {
    writer: writerData,
    meta: {
      totalPosts,
      page,
      limit,
      totalPages: Math.ceil(totalPosts / limit),
    },
  };
};

export {
  createWriter,
  updateWriter,
  deleteWriter,
  findWriterByUserId,
  getWriter,
  promoteToWriter,
  getWriterDashboard,
};
