import { prisma } from "@/database/db.js";
import { User } from "@/generated/prisma/client.js";

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const findUserById = async (user_id: string) => {
  return await prisma.user.findUnique({
    where: { user_id },
  });
};

const createUser = async (data: {
  fullname: string;
  email: string;
  password: string;
  salt: string;
}): Promise<User> => {
  return await prisma.user.create({
    data: {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      salt: data.salt,
    },
  });
};

export { findUserByEmail, createUser, findUserById };
