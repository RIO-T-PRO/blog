import { prisma } from "../db.js";

// ---------- For signin / signup (replace all tokens for user) ----------
export const upsertRefreshToken = async (
  userId: string,
  token: string,
  expiresAt: Date,
) => {
  // Delete any existing refresh tokens for this user (to avoid duplicates)
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });
  // Create a new one
  return prisma.refreshToken.create({
    data: { userId, token, expiresAt },
  });
};

// ---------- For refresh token rotation (update by ID) ----------
export const updateRefreshToken = async (
  id: string,
  newToken: string,
  expiresAt: Date,
) => {
  return prisma.refreshToken.update({
    where: { id },
    data: { token: newToken, expiresAt },
  });
};

// ---------- Other helpers ----------
export const createRefreshToken = async (
  userId: string,
  token: string,
  expiresAt: Date,
) => {
  return prisma.refreshToken.create({
    data: { token, expiresAt, userId },
  });
};

export const findRefreshToken = async (token: string) => {
  return prisma.refreshToken.findUnique({
    where: { token },
    include: { user: true },
  });
};

export const findRefreshTokenByUserId = async (userId: string) => {
  return prisma.refreshToken.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteRefreshToken = async (userId: string) => {
  return prisma.refreshToken.deleteMany({
    where: { userId },
  });
};
