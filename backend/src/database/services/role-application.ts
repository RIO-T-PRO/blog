import { prisma } from "../db.js";
import {
  RoleApplication,
  RoleApplicationStatus,
} from "@/generated/prisma/client.js";

export type CreateRoleApplicationData = {
  userId: string;
  roleId: string;
  message?: string;
};

export const createRoleApplication = async (
  data: CreateRoleApplicationData,
): Promise<RoleApplication> => {
  return prisma.roleApplication.create({
    data,
  });
};

export const getRoleApplicationById = async (id: string) => {
  return prisma.roleApplication.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: {
              username: true,
              avatarUrl: true,
            },
          },
          userRoles: {
            select: {
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
      role: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
      reviewedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const listApplicationsByUser = async (userId: string) => {
  return prisma.roleApplication.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      role: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
      reviewedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const listRoleApplications = async () => {
  return prisma.roleApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: {
              username: true,
              avatarUrl: true,
            },
          },
        },
      },
      role: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
      reviewedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const reviewRoleApplication = async (
  applicationId: string,
  reviewedById: string,
  status: RoleApplicationStatus,
) => {
  return prisma.$transaction(async (tx) => {
    const application = await tx.roleApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      throw new Error("Application not found");
    }

    const updated = await tx.roleApplication.update({
      where: { id: applicationId },
      data: {
        reviewedById,
        reviewedAt: new Date(),
        status,
      },
    });

    if (status === "APPROVED") {
      const exists = await tx.userRole.findFirst({
        where: {
          userId: application.userId,
          roleId: application.roleId,
        },
      });

      if (!exists) {
        await tx.userRole.create({
          data: {
            userId: application.userId,
            roleId: application.roleId,
          },
        });
      }
    }

    return updated;
  });
};
