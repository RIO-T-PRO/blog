// src/controllers/profile.ts

import { Request, Response } from "express";

import {
  createUserProfile as createProfileService,
  updateUserProfile as updateProfileService,
  deleteUserProfile as deleteProfileService,
  findProfileByProfileId,
  findProfileByUserId,
} from "@/database/services/profile.js";

import {
  CreateProfileBody,
  ProfileIdParam,
  UpdateProfileBody,
} from "@/schemas/profile.js";

/* CREATE PROFILE */
const createUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { user } = req as Request & {
      user: {
        user_id: string;
      };
    };

    const { bio, avatar } = req.body as CreateProfileBody;

    const existingProfile = await findProfileByUserId(user.user_id);

    if (existingProfile) {
      return res.status(400).json({
        error: "Profile already exists",
      });
    }

    const newProfile = await createProfileService({
      user_id: user.user_id,
      bio,
      avatar,
    });

    return res.status(201).json({
      status: "success",
      data: {
        profile: newProfile,
      },
    });
  } catch (error) {
    console.error("Create profile error:", error);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
};

/* GET CURRENT AUTH USER PROFILE */
const getCurrentUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { user } = req as Request & {
      user: {
        user_id: string;
        fullname: string;
        email: string;

        writer?: unknown | null;
        admin?: unknown | null;
      };
    };

    const profile = await findProfileByUserId(user.user_id);

    return res.status(200).json({
      status: "success",

      data: {
        profile: profile
          ? {
              user_profile_id: profile.user_profile_id,
              bio: profile.bio,
              avatar: profile.avatar,
              createdAt: profile.createdAt,
              updatedAt: profile.updatedAt,

              user: {
                user_id: profile.user.user_id,
                fullname: profile.user.fullname,
                email: profile.user.email,
                status: profile.user.status,

                writer: profile.user.writer,
                admin: profile.user.admin,
              },
            }
          : {
              user_profile_id: null,
              user_id: user.user_id,
              bio: null,
              avatar: null,
              createdAt: null,
              updatedAt: null,

              user: {
                user_id: user.user_id,
                fullname: user.fullname,
                email: user.email,

                writer: user.writer,
                admin: user.admin,
              },
            },
      },
    });
  } catch (error) {
    console.error("Get current profile error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

/* GET PROFILE BY PROFILE ID */
const getUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { profileId } = req.params as ProfileIdParam;

    const profile = await findProfileByProfileId(profileId);

    if (!profile) {
      return res.status(404).json({
        error: "Profile not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        profile: {
          user_profile_id: profile.user_profile_id,
          user_id: profile.user_id,
          bio: profile.bio,
          avatar: profile.avatar,
          createdAt: profile.createdAt,
          updatedAt: profile.updatedAt,

          user: {
            user_id: profile.user.user_id,
            fullname: profile.user.fullname,
            email: profile.user.email,
          },
        },
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

/* UPDATE PROFILE */
const updateUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { profileId } = req.params as ProfileIdParam;
    const update = req.body as UpdateProfileBody;

    console.log("profileId:", profileId);
    console.log("body:", req.body);

    const updatedProfile = await updateProfileService(profileId, update);

    return res.status(200).json({
      status: "success",
      data: {
        profile: updatedProfile,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
};

/* DELETE PROFILE */
const deleteUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { profileId } = req.params as ProfileIdParam;

    await deleteProfileService(profileId);

    return res.status(200).json({
      status: "success",
      message: "Profile deleted successfully.",
    });
  } catch (error) {
    console.error("Delete profile error:", error);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
};

export {
  createUserProfile,
  getCurrentUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
