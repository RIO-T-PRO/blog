import { findProfileByUserId } from "@/database/services/profile.js";
import { findUserById } from "@/database/services/user.js";
import { DashboardParams } from "@/schemas/user.schema.js";
import { ProfileIdParam } from "@/schemas/profile.js";
import { NextFunction, Request, Response } from "express";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required." });
    }

    const currentUser = await findUserById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // For routes with /profile/:userId or /dashboard/:userId
    const { userId: requestedUserId } =
      req.params as unknown as DashboardParams;

    if (requestedUserId && requestedUserId !== userId) {
      return res
        .status(403)
        .json({ error: "Access denied. You can only access your own data." });
    }

    // For routes with /profile/:profileId (profile ownership verification)
    const { profileId } = req.params as Partial<ProfileIdParam>;

    if (profileId) {
      const profile = await findProfileByUserId(profileId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found." });
      }

      if (profile.user_id !== userId) {
        return res
          .status(403)
          .json({ error: "You can only access your own profile." });
      }
    }

    req.user = currentUser;

    next();
  } catch (error) {
    console.error("User access verification error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
