import { deleteRefreshToken } from "@/database/services/token.js";
import { clearRefreshTokenCookie, verifyToken } from "@/utils/index.js";
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

    return res.status(200).json({
      message: "Signed out successfully",
    });
  } catch (error) {
    console.error("Signout error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
