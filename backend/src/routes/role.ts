import { assignRoleHandler, revokeRoleHandler } from "@/controllers/role.js";
import { authenticate } from "@/middlewares/auth.js";
import { requireRole } from "@/middlewares/role-require.js";
import { validate } from "@/middlewares/validate.js";
import { RoleIdParamSchema } from "@/schemas/role.js";
import express from "express";

const router = express.Router();

router.use(authenticate);

// role endpoints
router.post(
  "/:userId/roles/:roleId",
  validate(RoleIdParamSchema, "params"),
  requireRole("admin"),
  assignRoleHandler,
);

router.delete(
  "/:userId/roles/:roleId",
  validate(RoleIdParamSchema, "params"),
  requireRole("admin"),
  revokeRoleHandler,
);

export default router;
