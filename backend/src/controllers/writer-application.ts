import {
  applyToBecomeWriter,
  findApplicationById,
  findAllApplications,
  findApplicationByUserId,
} from "@/database/services/writer-application.js";

import {
  ApplyWriterBody,
  WriterApplicationIdParam,
} from "@/schemas/application.js";

import { Request, Response } from "express";

const applyWriter = async (req: Request, res: Response): Promise<Response> => {
  const { reason, website } = req.body as ApplyWriterBody;

  try {
    const application = await applyToBecomeWriter({
      userId: req.user.user_id,
      reason,
      website,
    });

    return res.status(201).json({
      status: "success",
      data: { application },
    });
  } catch (error) {
    console.error("Apply writer error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

// Get a specific application by ID (admin or owner)
const getApplyWriter = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { applicationId } = req.params as WriterApplicationIdParam;

  try {
    const application = await findApplicationById(applicationId);

    if (!application) {
      return res.status(200).json({
        status: "success",
        data: {
          application: null,
        },
      });
    }

    return res.status(200).json({
      status: "success",
      data: { application },
    });
  } catch (error) {
    console.error("Get application by ID error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

// Get all applications (admin only)
const getAllApplications = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const applications = await findAllApplications();

    return res.status(200).json({
      status: "success",
      data: { applications },
    });
  } catch (error) {
    console.error("Get all applications error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

// Get current user's application
const getCurrentUserApplication = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const userId = req.user.user_id;
    const application = await findApplicationByUserId(userId);

    if (!application) {
      return res.status(404).json({
        status: "error",
        message: "No application found for this user.",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { application },
    });
  } catch (error) {
    console.error("Get current user application error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

export {
  applyWriter,
  getApplyWriter,
  getAllApplications,
  getCurrentUserApplication,
};
