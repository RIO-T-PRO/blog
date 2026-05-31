// src/database/services/profile.ts

import { prisma } from "@/database/db.js";

/* CREATE PROFILE */
export const createUserProfile = async (data: {
  user_id: string;
  bio?: string;
  avatar?: string;
}) => {
  return prisma.userProfile.create({
    data,
    include: {
      user: true,
    },
  });
};

/* UPDATE PROFILE */
export const updateUserProfile = async (
  user_profile_id: string,
  data: Partial<{
    bio: string;
    avatar: string;
  }>,
) => {
  return prisma.userProfile.update({
    where: {
      user_profile_id,
    },
    data,
    include: {
      user: true,
    },
  });
};

/* DELETE PROFILE */
export const deleteUserProfile = async (user_profile_id: string) => {
  return prisma.userProfile.delete({
    where: {
      user_profile_id,
    },
  });
};

/* FIND PROFILE BY USER ID */
export const findProfileByUserId = async (user_id: string) => {
  return prisma.userProfile.findUnique({
    where: {
      user_id,
    },
    include: {
      user: {
        include: {
          writer: true,
          admin: true,
        },
      },
    },
  });
};

/* FIND PROFILE BY PROFILE ID */
export const findProfileByProfileId = async (user_profile_id: string) => {
  return prisma.userProfile.findUnique({
    where: {
      user_profile_id,
    },
    include: {
      user: true,
    },
  });
};
