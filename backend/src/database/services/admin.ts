import { prisma } from "@/database/db.js";
import { Admin } from "@/generated/prisma/client.js";

interface GetAdminWritersParams {
  adminUserId: string;
  published?: boolean;
  page?: number;
  limit?: number;
}

const updateAdmin = async (
  adminId: string,
  data: Partial<Pick<Admin, "role">>,
): Promise<Admin> => {
  return prisma.admin.update({
    where: { admin_id: adminId },
    data,
  });
};

const promoteToAdmin = async (userId: string): Promise<Admin> => {
  const existingAdmin = await prisma.admin.findFirst();

  if (existingAdmin) {
    throw new Error("An admin already exists. Only one admin is allowed.");
  }

  return prisma.admin.create({
    data: {
      user: { connect: { user_id: userId } },
    },
  });
};

const findAdminById = async (admin_id: string): Promise<Admin | null> => {
  return prisma.admin.findUnique({
    where: { admin_id: admin_id },
  });
};

const getAdminByUserId = async (user_id: string): Promise<Admin | null> => {
  return prisma.admin.findUnique({
    where: { user_id: user_id },
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

const getadminDashboard = async ({
  adminUserId,
  published,
  page = 1,
  limit = 20,
}: GetAdminWritersParams) => {
  const skip = (page - 1) * limit;
  const postWhereCondition = published !== undefined ? { published } : {};

  const currentAdmin = await prisma.admin.findUnique({
    where: { admin_id: adminUserId },
    select: {
      user: {
        select: {
          fullname: true,
          userProfile: {
            select: {
              bio: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  const writers = await prisma.writer.findMany({
    skip,
    take: limit,
    include: {
      user: {
        select: {
          fullname: true,
          email: true,
          userProfile: {
            select: { bio: true, avatar: true },
          },
        },
      },
      posts: {
        where: postWhereCondition,
        orderBy: { createdAt: "desc" },
        include: {
          comments: {
            take: 5,
            orderBy: { createdAt: "desc" },
            include: {
              user: {
                select: {
                  fullname: true,
                  email: true,
                  userProfile: { select: { avatar: true } },
                },
              },
            },
          },
          _count: { select: { comments: true } },
        },
      },
      _count: { select: { posts: true } },
    },
  });

  const totalWriters = await prisma.writer.count();

  return {
    adminProfile: currentAdmin,
    data: writers,
    meta: {
      total: totalWriters,
      page,
      limit,
      totalPages: Math.ceil(totalWriters / limit),
    },
  };
};

export {
  promoteToAdmin,
  updateAdmin,
  findAdminById,
  getAdminByUserId,
  getadminDashboard,
};
