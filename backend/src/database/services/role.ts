import { prisma } from "../db.js";

export const createRole = async (name: string, description?: string | null) => {
  return prisma.role.create({
    data: {
      name,
      description: description ?? null,
    },
  });
};

export const updateRoleById = async (
  id: string,
  data: { name?: string; description?: string | null },
) => {
  return prisma.role.update({
    where: { id },
    data,
  });
};

export const deleteRoleByName = async (name: string) => {
  return prisma.role.delete({
    where: { name },
  });
};

export const deleteRoleById = async (id: string) => {
  return prisma.role.delete({
    where: { id },
  });
};

export const findRoleByName = async (name: string) => {
  return prisma.role.findUnique({ where: { name } });
};

export const findRoleById = async (id: string) => {
  return prisma.role.findUnique({ where: { id } });
};

export const assignRoleToUser = async (userId: string, roleId: string) => {
  return prisma.userRole.create({
    data: { userId, roleId },
  });
};

export const revokeRoleFromUser = async (userId: string, roleId: string) => {
  return prisma.userRole.delete({
    where: {
      userId_roleId: { userId, roleId }, // uses the compound unique constraint
    },
  });
};
