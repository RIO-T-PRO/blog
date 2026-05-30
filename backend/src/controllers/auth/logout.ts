import { Request, Response } from "express";
import { clearAuthCookie } from "@/utils/cookie.js";

export const logout = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    clearAuthCookie(res);
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
