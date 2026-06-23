import { findUserById, softDeleteUser } from "@/database/services/user.js";
import { UserIdParam } from "@/schemas/user.js";
import { resError, resSuccess } from "@/utils/response.js";
import { Request, Response } from "express";

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user;
    const { userId } = req.params as UserIdParam;

    if (!currentUser || !currentUser.roles.includes("admin")) {
      return resError(res, "Unauthorized: Admin access required", 403);
    }

    if (!userId) {
      return resError(res, "User ID is required", 400);
    }

    const existingUser = await findUserById(userId);

    if (!existingUser) {
      return resError(res, "User not found", 404);
    }

    await softDeleteUser(existingUser.id);

    return resSuccess(res, "User deleted successfully");
  } catch (error) {
    console.error("User delete error", error);
    return resError(res, "Internal server error", 500);
  }
};
