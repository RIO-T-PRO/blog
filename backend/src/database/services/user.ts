import { prisma } from "@/database/db.js";
import { User } from "@/generated/prisma/client.js";

interface GetUserDashboardParams {
  userId: string;
  page?: number;
  limit?: number;
}

const createUser = async (data: {
  fullname: string;
  email: string;
  password: string;
  salt: string;
}): Promise<User> => {
  return prisma.user.create({
    data: {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      salt: data.salt,
    },
  });
};

const findUserById = async (user_id: string) => {
  return prisma.user.findUnique({
    where: { user_id: user_id },
  });
};

const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email: email },
    include: { userProfile: true },
  });
};

const getUserDashboard = async ({
  userId,
  page = 1,
  limit = 15,
}: GetUserDashboardParams) => {
  const skip = (page - 1) * limit;

  const userProfile = await prisma.user.findUnique({
    where: { user_id: userId },
    select: {
      fullname: true,
      email: true,
      userProfile: {
        select: {
          bio: true,
          avatar: true,
        },
      },
    },
  });

  const commentsHistory = await prisma.comment.findMany({
    where: { user_id: userId },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: {
          post_id: true,
          title: true,
          writer: {
            include: {
              user: {
                select: { fullname: true },
              },
            },
          },
        },
      },
    },
  });

  const totalComments = await prisma.comment.count({
    where: { user_id: userId },
  });

  return {
    profile: userProfile,
    comments: commentsHistory,
    meta: {
      totalComments,
      page,
      limit,
      totalPages: Math.ceil(totalComments / limit),
    },
  };
};

export { createUser, findUserById, findUserByEmail, getUserDashboard };
