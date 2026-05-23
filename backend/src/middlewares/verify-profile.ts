import { findProfileByUserId } from "@/database/services/profile.js";
import { ProfileIdParam } from "@/schemas/profile.js";
import { NextFunction, Request, Response } from "express";

export const verifyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.user_id;
    const { profile_id } = req.params as ProfileIdParam;

    const profile = await findProfileByUserId(profile_id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found." });
    }

    if (profile.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "You can only access your own profile." });
    }

    req.profile = profile;

    next();
  } catch (error) {
    console.error("Verify profile error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
