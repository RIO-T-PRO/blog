import { findUserById } from "@/database/services/user.js";
import { errorResponse } from "@/utils/api-response.js";
import { Request, Response } from "express";

const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;

    if (!userId) return errorResponse(res, 400, "Authentication required.");

    const user = await findUserById(userId);

    if (!user) return errorResponse(res, 400, "User not found");

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};
