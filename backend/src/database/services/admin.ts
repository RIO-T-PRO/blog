import { prisma } from "@/database/db.js";
import { Admin } from "@/generated/prisma/client.js";

const getAdminWithUser = async (): Promise<Admin | null> => {
  return prisma.admin.findFirst({
    include: {
      user: true,
    },
  });
};

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

export { getAdminWithUser, promoteToAdmin, updateAdmin, findAdminById };
