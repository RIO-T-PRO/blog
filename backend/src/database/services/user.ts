import { prisma } from "@/database/db.js";
import { User } from "@/generated/prisma/client.js";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: {
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
