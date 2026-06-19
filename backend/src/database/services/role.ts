import { prisma } from "../db.js";

export const createRole = async (name: string, description?: string) => {
  return prisma.role.create({
    data: {
      name,
      description: description ?? null,
    },
  });
};

export const updateRoleById = async (
  id: number,
  data: { name?: string; description?: string },
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

export const deleteRoleById = async (id: number) => {
  return prisma.role.delete({
    where: { id },
  });
};

export const findRoleByName = async (name: string) => {
  return prisma.role.findUnique({ where: { name } });
};

export const findRoleById = async (id: number) => {
  return prisma.role.findUnique({ where: { id } });
};

export const assignRoleToUser = async (userId: string, roleId: number) => {
  return prisma.userRole.create({
    data: { userId, roleId },
  });
};
