import { prisma } from "@/database/db.js";
import { User } from "@/generated/prisma/client.js";

const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
};

const findUserById = async (user_id: string) => {
  return prisma.user.findUnique({
    where: { id: user_id },
  });
};

// Fixed: Removed non-existent userProfile inclusion
const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email: email },
  });
};

interface UpdateUserParams {
  userId: string;
  name?: string; // Fixed: renamed from fullname
  email?: string;
}

const updateUser = async ({
  userId,
  name,
  email,
}: UpdateUserParams): Promise<User> => {
  const data: any = {};

  if (name) data.name = name; // Fixed field name
  if (email) data.email = email;

  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

const softDeleteUser = async (userId: string): Promise<User> => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      active: false,
    },
  });
};

export const findUserWithRole = async (userId: string) => {
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!dbUser) return null;

  return {
    id: dbUser.id,
    email: dbUser.email,
    roles: dbUser.userRoles.map((ur) => ur.role.name),
  };
};

export const hasRole = async (
  userId: string,
  allowedRoles: string[],
): Promise<boolean> => {
  const role = await prisma.userRole.findFirst({
    where: {
      userId,
      role: { name: { in: allowedRoles } },
    },
    select: { userId: true },
  });
  return !!role;
};

export {
  createUser,
  updateUser,
  findUserById,
  findUserByEmail,
  softDeleteUser,
};
