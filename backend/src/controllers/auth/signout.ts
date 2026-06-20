import { deleteRefreshToken } from "@/database/services/token.js";
import {
  clearRefreshTokenCookie,
  resError,
  resSuccess,
  verifyToken,
} from "@/utils/index.js";
import { Request, Response } from "express";

export const signout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      try {
        const payload = verifyToken("refresh", refreshToken) as { id: string };
        await deleteRefreshToken(payload.id);
      } catch {
        // ignore invalid token
      }
    }
    clearRefreshTokenCookie(res);
    return resSuccess(res, null, "Signed out successfully", 200);
  } catch (error) {
    console.error("Signout error", error);
    return resError(res, "Internal server error", 500);
  }
};
