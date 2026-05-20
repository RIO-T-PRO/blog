import { prisma } from "@/database/db.js";

const createUserProfile = async (data: {
  user_profile_id: string;
  user_id: string;
  bio?: string;
  avatar?: string;
}) => {
  return prisma.userProfile.create({ data });
};

const updateUserProfile = async (
  user_profile_id: string,
  data: Partial<{
    bio: string;
    avatar: string;
  }>,
) => {
  return prisma.userProfile.update({
    where: { user_profile_id },
    data,
  });
};

const deleteUserProfile = async (user_profile_id: string) => {
  return prisma.userProfile.delete({ where: { user_profile_id } });
};

const findProfileByUserId = async (user_profile_id: string) => {
  return prisma.userProfile.findUnique({
    where: { user_profile_id: user_profile_id },
  });
};

export {
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  findProfileByUserId,
};
