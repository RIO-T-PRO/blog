import { assignRoleHandler, revokeRoleHandler } from "@/controllers/role.js";
import { authenticate } from "@/middlewares/auth.js";
import { requireRole } from "@/middlewares/role-require.js";
import { validate } from "@/middlewares/validate.js";
import { UUIDSchema } from "@/schemas/common.js";
import express from "express";

const router = express.Router();

router.use(authenticate);

// role endpoints
router.post(
  "/users/:userId/roles/:roleId",
  validate(UUIDSchema, "params"),
  requireRole("admin"),
  assignRoleHandler,
);

router.delete(
  "/users/:userId/roles/:roleId",
  validate(UUIDSchema, "params"),
  revokeRoleHandler,
);

export default router;
