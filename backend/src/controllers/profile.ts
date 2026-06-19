import { findUserWithRole } from "@/database/services/user.js";
import { getUserProfile } from "@/database/services/profile.js";
import { resError } from "@/utils/response.js";
import { Request, Response } from "express";
import { UUIDParam } from "@/schemas/common.js";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id as UUIDParam;

    if (!userId) return resError(res, "Unauthorized", 400);

    const [profile, userWithRoles] = await Promise.all([
      getUserProfile(userId),
      findUserWithRole(userId),
    ]);

    if (!profile) return null;

    return {
      ...profile,
      userRoles: userWithRoles?.roles ?? [],
    };
  } catch (error) {
    console.error("Profile error", error);
    resError(res, "Internal server error", 500);
  }
};
