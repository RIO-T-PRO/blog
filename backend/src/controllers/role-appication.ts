import { Request, Response } from "express";
import { prisma } from "@/database/db.js";
import {
  createRoleApplication,
  getRoleApplicationById,
  listApplicationsByUser,
  listRoleApplications,
  reviewRoleApplication,
} from "@/database/services/role-application.js";
import { resError, resSuccess } from "@/utils/index.js";
import {
  CreateRoleApplication,
  ReviewRoleApplicationBody,
  RoleApplicationIdParam,
} from "@/schemas/role-application.js";
import { UserIdParam } from "@/schemas/user.js";

export const createRoleApplicationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId, roleId, message } = req.body as CreateRoleApplication;

    if (!roleId) {
      return resError(res, "Role is required", 400);
    }

    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return resError(res, "Role not found", 404);
    }

    const existing = await prisma.roleApplication.findFirst({
      where: {
        userId,
        roleId,
        status: "PENDING",
      },
    });

    if (existing) {
      return resError(
        res,
        "You already have a pending application for this role",
        409,
      );
    }

    const application = await createRoleApplication({
      userId,
      roleId,
      message,
    });

    return resSuccess(
      res,
      { data: application },
      "Application submitted successfully",
      201,
    );
  } catch (error) {
    console.error("Create role application error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const getMyApplicationsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return resError(res, "Unauthorized", 401);
    }

    const applications = await listApplicationsByUser(userId);

    return resSuccess(
      res,
      { data: applications },
      "Applications fetched successfully",
    );
  } catch (error) {
    console.error("Get my applications error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const getApplicationsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const isAdmin = req.user?.roles?.includes("admin");
    if (!isAdmin) {
      return resError(res, "Forbidden", 403);
    }

    const applications = await listRoleApplications();

    return resSuccess(
      res,
      { data: applications },
      "Applications fetched successfully",
    );
  } catch (error) {
    console.error("Get applications error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const getApplicationController = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const isAdmin = user?.roles?.includes("admin");

    const { applicationId } = req.params as RoleApplicationIdParam;
    const application = await getRoleApplicationById(applicationId);

    if (!application) {
      return resError(res, "Application not found", 404);
    }

    if (!isAdmin && application.user.id !== user.id) {
      return resError(res, "Forbidden", 403);
    }

    return resSuccess(
      res,
      { data: application },
      "Application fetched successfully",
    );
  } catch (error) {
    console.error("Get application error", error);
    return resError(res, "Internal server error", 500);
  }
};

export const reviewApplicationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = req.user;

    const isAdmin = user?.roles?.includes("admin");
    if (!isAdmin) {
      return resError(res, "Forbidden", 403);
    }

    const { userId } = req.params as UserIdParam;
    const { status, message } = req.body as ReviewRoleApplicationBody;

    if (!["APPROVED", "REJECTED", "CANCELLED"].includes(status)) {
      return resError(res, message, 400);
    }

    const updated = await reviewRoleApplication(userId, user.id, status);

    return resSuccess(
      res,
      { data: updated },
      "Application reviewed successfully",
    );
  } catch (error) {
    console.error("Review application error", error);
    return resError(res, "Internal server error", 500);
  }
};
