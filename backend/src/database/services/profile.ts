import { prisma } from "../db.js";
import { UserProfile } from "@/generated/prisma/client.js";

export const upsertUserProfile = async (
  userId: string,
  data: { username: string; bio?: string; website?: string },
): Promise<UserProfile> => {
  return prisma.userProfile.upsert({
    where: { userId },
    create: {
      userId,
      username: data.username,
      bio: data.bio,
      website: data.website,
    },
    update: {
      username: data.username,
      bio: data.bio,
      website: data.website,
    },
  });
};

export const getUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  return prisma.userProfile.findUnique({
    where: { userId },
  });
};
