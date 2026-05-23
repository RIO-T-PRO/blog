import { Request, Response } from "express";
import { getUserDashboard } from "@/database/services/user.js";
import { DashboardParams, DashboardQuery } from "@/schemas/user.js";

export const userDashboard = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params as DashboardParams;

    const { page, limit } = req.query as unknown as DashboardQuery;

    const dashboardData = await getUserDashboard({
      userId: user_id,
      page,
      limit,
    });

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error("User Dashboard Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
