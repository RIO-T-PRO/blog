import { findUserWithRole } from "@/database/services/user.js";
import {
  getUserProfile,
  updateUserProfile,
} from "@/database/services/profile.js";
import { resError, resSuccess } from "@/utils/response.js";
import { Request, Response } from "express";
import { UpdateProfile } from "@/schemas/profile.js";

export const getProfileService = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

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

export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const existingProfile = getUserProfile(userId);

    if (!existingProfile) return resError(res, "Profile not found", 400);

    const { username, bio, avatarUrl, website } = req.body as UpdateProfile;

    const profile = await updateUserProfile(userId, {
      username,
      bio,
      avatarUrl,
      website,
    });

    return resSuccess(res, { profile }, "Profile updated");
  } catch (error) {
    console.error("Update profile error", error);
    return resError(res, "Could not update profile", 500);
  }
};
