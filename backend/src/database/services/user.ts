import { prisma } from "@/database/db.js";
import { User } from "@/generated/prisma/client.js";

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
  });
};

export { createUser, findUserById, findUserByEmail };
