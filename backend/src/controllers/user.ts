import { Request, Response } from "express";
import {
  getUserDashboard,
  softDeleteUser,
  updateUser,
} from "@/database/services/user.js";
import {
  DashboardParams,
  DashboardQuery,
  UpdateUserBody,
  UpdateUserParams,
} from "@/schemas/user.js";

export const userDashboard = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as DashboardParams;
    const { page, limit } = req.query as unknown as DashboardQuery;

    const dashboardData = await getUserDashboard({
      userId: userId,
      page,
      limit,
    });

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error("User Dashboard Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as UpdateUserParams;
    const updateData = req.body as UpdateUserBody;

    const updatedUser = await updateUser({
      userId: userId,
      fullname: updateData.fullname,
      email: updateData.email,
    });

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as UpdateUserParams;

    await softDeleteUser(userId);

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
