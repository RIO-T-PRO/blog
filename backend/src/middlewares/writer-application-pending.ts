import { Request, Response, NextFunction } from "express";
import {
  findApplicationById,
  findApplicationByUserId,
} from "@/database/services/writer-application.js";
import { getAdminByUserId } from "@/database/services/admin.js";
import { WriterApplicationIdParam } from "@/schemas/application.js";

const ensureNoWriterApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.user.user_id;
    const application = await findApplicationByUserId(userId);

    if (application) {
      return res.status(409).json({
        status: "error",
        message: "Application already submitted.",
      });
    }

    next();
  } catch (error) {
    console.error("Application middleware error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

const ensureApplicationOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.user.user_id;
    const { applicationId } = req.params as WriterApplicationIdParam;

    const admin = await getAdminByUserId(userId);
    if (admin) {
      if (applicationId) {
        const application = await findApplicationById(applicationId);

        if (!application) {
          return res.status(404).json({
            status: "error",
            message: "Application not found.",
          });
        }

        req.application = application;
      }
      return next();
    }

    let application;
    if (applicationId) {
      application = await findApplicationById(applicationId);
    } else {
      application = await findApplicationByUserId(userId);
    }

    if (!application) {
      return res.status(404).json({
        status: "error",
        message: "Application not found.",
      });
    }

    if (application.user_id !== userId) {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to access this application.",
      });
    }

    req.application = application;
    next();
  } catch (error) {
    console.error("Ownership verification error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

export { ensureNoWriterApplication, ensureApplicationOwnership };
