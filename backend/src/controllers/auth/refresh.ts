import { env } from "@/config/env.js";
import {
  deleteRefreshToken,
  findRefreshToken,
  upsertRefreshToken,
} from "@/database/services/token.js";
import { findUserById } from "@/database/services/user.js";
import {
  generateToken,
  getExpiresDate,
  hashToken,
  setRefreshTokenCookie,
  verifyToken,
} from "@/utils/index.js";
import { Request, Response } from "express";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const tokenFromCookie = req.cookies?.refreshToken;

    if (!tokenFromCookie) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const payload = verifyToken("refresh", tokenFromCookie) as { id: string };
    const hashedToken = hashToken(tokenFromCookie);
    const storedToken = await findRefreshToken(hashedToken);

    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    if (storedToken.userId !== payload.id) {
      return res.status(403).json({ message: "Token mismatch" });
    }

    if (storedToken.expiresAt.getTime() < Date.now()) {
      await deleteRefreshToken(payload.id);
      return res.status(403).json({ message: "Refresh token expired" });
    }

    const user = await findUserById(payload.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = generateToken("access", user.id);
    const newRefreshToken = generateToken("refresh", user.id);
    const expiresAt = getExpiresDate(env.REFRESH_TOKEN_EXPIRES_IN);
    const hashedNewRefreshToken = hashToken(newRefreshToken);

    await upsertRefreshToken(user.id, hashedNewRefreshToken, expiresAt);
    setRefreshTokenCookie(res, newRefreshToken);

    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh token error", error);
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

export const me = (req: Request, res: Response) => {
  const user = req.user;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({
    message: "success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};
