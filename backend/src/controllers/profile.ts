import { Request, Response } from "express";
import {
  createUserProfile as createProfileService,
  updateUserProfile as updateProfileService,
  deleteUserProfile as deleteProfileService,
  findProfileByUserId,
} from "@/database/services/profile.js";
import { CreateProfileBody } from "@/schemas/profile.js";

const createUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = req.user.user_id;
  const { bio, avatar } = req.body as CreateProfileBody;

  try {
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
    return res.status(500).json({ message: "Internal server error." });
  }
};

const updateUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const profile = req.profile;

    const updatedProfile = await updateProfileService(
      profile.user_profile_id,
      req.body,
    );
    return res
      .status(200)
      .json({ status: "success", data: { profile: updatedProfile } });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const deleteUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const profile = req.profile;

  try {
    await deleteProfileService(profile.user_profile_id);
    return res
      .status(200)
      .json({ status: "success", message: "Profile deleted successfully." });
  } catch (error) {
    console.error("Delete profile error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const attachedProfile = req.profile;

  try {
    const profile = await findProfileByUserId(attachedProfile.user_profile_id);

    return res.status(200).json({ status: "success", data: { profile } });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export {
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUserProfile,
};
