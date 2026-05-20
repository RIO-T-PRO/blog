import { Request, Response } from "express";
import { errorResponse } from "@/utils/api-response.js";
import {
  findAdminById,
  updateAdmin as updateAdminService,
} from "@/database/services/admin.js";

const getAdmin = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user?.user_id;
  if (!userId) return errorResponse(res, 401, "Authentication required.");

  try {
    const admin = await findAdminById(userId);

    if (!admin) {
      return errorResponse(res, 403, "Only admins can view admin records.");
    }

    return res.status(200).json({ status: "success", data: { admin } });
  } catch (error) {
    console.error("Get admin error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

export { getAdmin };
