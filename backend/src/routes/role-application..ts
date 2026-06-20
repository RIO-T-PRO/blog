import {
  createRoleApplicationController,
  getApplicationController,
  getMyApplicationsController,
  reviewApplicationController,
} from "@/controllers/role-appication.js";
import { authenticate } from "@/middlewares/auth.js";
import { requireRole } from "@/middlewares/role-require.js";
import { validate } from "@/middlewares/validate.js";
import { RoleApplicationIdSchema } from "@/schemas/role-application.js";
import { CreateRoleSchema } from "@/schemas/role.js";
import { UserIdSchema } from "@/schemas/user.js";
import express from "express";

const router = express.Router();

router.use(authenticate);

router.get("/", requireRole("admin"), getMyApplicationsController);
router.get("/", requireRole("admin", "user"), getApplicationController);

router.post(
  "/",
  validate(CreateRoleSchema, "body"),
  requireRole("user"),
  createRoleApplicationController,
);

router.post(
  "/:userId",
  validate(UserIdSchema, "params"),
  requireRole("admin"),
  reviewApplicationController,
);

export default router;
