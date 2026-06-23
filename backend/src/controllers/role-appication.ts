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
    const userId = req.user?.id;
    if (!userId) {
      return resError(res, "Unauthorized", 401);
    }

    const { roleName, message } = req.body as CreateRoleApplication;

    if (!roleName) {
      return resError(res, "Role name is required", 400);
    }

    // Ensure the role exists (so we have a valid foreign key)
    let role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      role = await prisma.role.create({
        data: {
          name: roleName,
          description: `Auto-created role: ${roleName}`,
        },
      });
    }

    // Prevent duplicate pending applications for the same role
    const existing = await prisma.roleApplication.findFirst({
      where: { userId, roleId: role.id, status: "PENDING" },
    });
    if (existing) {
      return resError(
        res,
        "You already have a pending application for this role",
        409,
      );
    }

    // Create the application (no role assignment to user)
    const application = await createRoleApplication({
      userId,
      roleId: role.id,
      message,
    });

    return resSuccess(
      res,
      { application },
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
      { applications },
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
      { applications },
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

    return resSuccess(res, { application }, "Application fetched successfully");
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
    const adminUser = req.user;
    const isAdmin = adminUser?.roles?.includes("admin");
    if (!isAdmin) {
      return resError(res, "Forbidden", 403);
    }

    const { userId } = req.params as UserIdParam;
    const { status, message: reviewMessage } =
      req.body as ReviewRoleApplicationBody;

    if (!["APPROVED", "REJECTED", "CANCELLED"].includes(status)) {
      return resError(res, "Invalid status", 400);
    }

    // Find the latest pending application for the user (could be multiple, but admin reviews one at a time)
    const application = await prisma.roleApplication.findFirst({
      where: { userId, status: "PENDING" },
    });

    if (!application) {
      return resError(res, "No pending application found for this user", 404);
    }

    // Update the application only – no role assignment
    const updated = await prisma.roleApplication.update({
      where: { id: application.id },
      data: {
        status,
        reviewedById: adminUser.id,
        reviewedAt: new Date(),
        // reviewMessage: reviewMessage || null,   // uncomment if column exists
      },
    });

    return resSuccess(res, { updated }, "Application reviewed successfully");
  } catch (error) {
    console.error("Review application error", error);
    return resError(res, "Internal server error", 500);
  }
};
