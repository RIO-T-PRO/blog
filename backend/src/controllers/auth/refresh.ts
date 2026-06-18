import {
  deleteRefreshToken,
  findRefreshToken,
  upsertRefreshToken,
} from "@/database/services/token.js";
import { findUserWithRole } from "@/database/services/user.js";
import { TokenPayload } from "@/types/token.js";
import {
  generateToken,
  getExpiresDate,
  hashToken,
  resError,
  resSuccess,
  setRefreshTokenCookie,
  verifyToken,
} from "@/utils/index.js";
import { Request, Response } from "express";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const tokenFromCookie = req.cookies?.refreshToken;
    if (!tokenFromCookie) {
      return resError(res, "No refresh token provided", 401);
    }

    const payload = verifyToken("refresh", tokenFromCookie) as TokenPayload;
    const hashedToken = hashToken(tokenFromCookie);
    const storedToken = await findRefreshToken(hashedToken);

    if (!storedToken) {
      return resError(res, "Invalid refresh token", 403);
    }

    if (storedToken.userId !== payload.id) {
      return resError(res, "Token mismatch", 403);
    }

    if (storedToken.expiresAt.getTime() < Date.now()) {
      await deleteRefreshToken(payload.id);
      return resError(res, "Refresh token expired", 403);
    }

    const userWithRoles = await findUserWithRole(payload.id);
    if (!userWithRoles) {
      return resError(res, "User not found", 404);
    }

    const newAccessToken = generateToken(
      "access",
      userWithRoles.id,
      userWithRoles.roles,
    );
    const newRefreshToken = generateToken("refresh", userWithRoles.id);
    const expiresAt = getExpiresDate("refresh");
    const hashedNewRefreshToken = hashToken(newRefreshToken);

    await upsertRefreshToken(
      userWithRoles.id,
      hashedNewRefreshToken,
      expiresAt,
    );
    setRefreshTokenCookie(res, newRefreshToken);

    return resSuccess(
      res,
      { accessToken: newAccessToken },
      "Token refreshed successfully",
      200,
    );
  } catch (error) {
    console.error("Refresh token error", error);
    return resError(res, "Invalid or expired refresh token", 403);
  }
};
