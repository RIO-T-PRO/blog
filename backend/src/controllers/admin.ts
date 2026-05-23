import { Request, Response } from "express";
import {
  getadminDashboard,
  updateAdmin as updateAdminService,
} from "@/database/services/admin.js";
import { adminDashboardQuerySchema, AdminIdParam } from "@/schemas/admin.js";

const getAdmin = async (req: Request, res: Response): Promise<Response> => {
  const admin = req.admin;

  try {
    return res.status(200).json({ status: "success", data: { admin } });
  } catch (error) {
    console.error("Get admin error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const adminDashboard = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const admin_id = req.admin.admin_id;

  try {
    const { page, limit, published } = adminDashboardQuerySchema.parse(
      req.query,
    );

    const dashboardData = await getadminDashboard({
      adminUserId: admin_id,
      published,
      page,
      limit,
    });

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export { getAdmin, adminDashboard };
