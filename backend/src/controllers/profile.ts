import { Request, Response } from "express";
import {
  createUserProfile as createProfileService,
  updateUserProfile as updateProfileService,
  deleteUserProfile as deleteProfileService,
  findProfileByUserId,
} from "@/database/services/profile.js";
import { errorResponse } from "@/utils/api-response.js";
import { findAdminById } from "@/database/services/admin.js";

const createUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = req.user?.user_id;
  const { bio, avatar } = req.body;

  if (!userId) return errorResponse(res, 401, "Authentication required.");

  try {
    const existingProfile = await findProfileByUserId(userId);

    if (existingProfile)
      return errorResponse(res, 409, "Profile already exists for this user.");

    const newProfile = await createProfileService({
      user_profile_id: crypto.randomUUID(),
      user_id: userId,
      bio,
      avatar,
    });

    return res
      .status(201)
      .json({ status: "success", data: { profile: newProfile } });
  } catch (error) {
    console.error("Create profile error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const updateUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = req.user?.user_id;
  const { profile_id } = req.params;

  if (!userId) return errorResponse(res, 401, "Authentication required.");

  try {
    if (typeof profile_id !== "string")
      return errorResponse(res, 400, "Profile Id required");

    const profile = await findProfileByUserId(profile_id);

    if (!profile) return errorResponse(res, 404, "Profile not found.");

    const isAdmin = await findAdminById(userId);
    if (profile.user_id !== userId && !isAdmin) {
      return errorResponse(res, 403, "You can only update your own profile.");
    }

    const updatedProfile = await updateProfileService(profile_id, req.body);
    return res
      .status(200)
      .json({ status: "success", data: { profile: updatedProfile } });
  } catch (error) {
    console.error("Update profile error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const deleteUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = req.user?.user_id;
  const { profile_id } = req.params;

  if (!userId) return errorResponse(res, 401, "Authentication required.");

  try {
    if (typeof profile_id !== "string")
      return errorResponse(res, 400, "Profile ID is required");

    const profile = await findProfileByUserId(profile_id);

    if (!profile) return errorResponse(res, 404, "Profile not found.");

    if (profile.user_id !== userId) {
      return errorResponse(res, 403, "You can only delete your own profile.");
    }

    await deleteProfileService(profile.user_profile_id);
    return res
      .status(200)
      .json({ status: "success", message: "Profile deleted successfully." });
  } catch (error) {
    console.error("Delete profile error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const getUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = req.user?.user_id;
  const { profile_id } = req.params;

  if (!userId) return errorResponse(res, 401, "Authentication required.");

  try {
    if (typeof profile_id !== "string")
      return errorResponse(res, 400, "User ID is required");

    const profile = await findProfileByUserId(profile_id);

    if (!profile) return errorResponse(res, 404, "Profile not found.");

    return res.status(200).json({ status: "success", data: { profile } });
  } catch (error) {
    console.error("Get profile error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

export {
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUserProfile,
};
