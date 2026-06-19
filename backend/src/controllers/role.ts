import { Request, Response } from "express";
import {
  createRole,
  updateRoleById,
  deleteRoleById,
  assignRoleToUser,
  revokeRoleFromUser,
} from "@/database/services/role.js";
import { resError, resSuccess } from "@/utils/index.js";
import { CreateRole, RoleIdParam, UpdateRole } from "@/schemas/role.js";

export const createRoleHandler = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body as CreateRole;
    if (!name) return resError(res, "Role name is required", 400);

    const role = await createRole(name, description);
    return resSuccess(res, { role }, "Role created", 201);
  } catch (error) {
    console.error("Create role error", error);
    return resError(res, "Could not create role", 500);
  }
};

export const assignRoleHandler = async (
  req: Request<{ userId: string; roleId: string }>,
  res: Response,
) => {
  try {
    const { userId, roleId } = req.params;

    await assignRoleToUser(userId, roleId);
    return resSuccess(res, null, "Role assigned to user", 201);
  } catch (error) {
    console.error("Assign role error", error);
    return resError(res, "Could not assign role", 500);
  }
};

// Revoke (remove) a role from a user
export const revokeRoleHandler = async (
  req: Request<{ userId: string; roleId: string }>,
  res: Response,
) => {
  try {
    const { userId, roleId } = req.params;

    await revokeRoleFromUser(userId, roleId);
    return resSuccess(res, null, "Role revoked from user");
  } catch (error) {
    console.error("Revoke role error", error);
    return resError(res, "Could not revoke role", 500);
  }
};
