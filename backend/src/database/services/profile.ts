import { prisma } from "../db.js";
import { UserProfile } from "@/generated/prisma/client.js";

export const upsertUserProfile = async (
  userId: string,
  data: {
    username: string;
    bio?: string;
    avatarUrl?: string;
    website?: string;
  },
): Promise<UserProfile> => {
  return prisma.userProfile.upsert({
    where: { userId },
    create: {
      userId,
      username: data.username,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      website: data.website,
    },
    update: {
      username: data.username,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      website: data.website,
    },
  });
};

export const updateUserProfile = async (
  userId: string,
  data: {
    username?: string;
    bio?: string | null;
    avatarUrl?: string | null;
    website?: string | null;
  },
): Promise<UserProfile> => {
  const profile = await prisma.userProfile.update({
    where: { userId },
    data,
  });
  return profile;
};

export const getUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  return prisma.userProfile.findUnique({
    where: { userId },
  });
};
