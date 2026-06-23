import {
  createRoleApplicationController,
  getApplicationController,
  getMyApplicationsController,
  getApplicationsController,
  reviewApplicationController,
} from "@/controllers/role-appication.js";
import { authenticate } from "@/middlewares/auth.js";
import { requireRole } from "@/middlewares/role-require.js";
import { validate } from "@/middlewares/validate.js";
import {
  CreateRoleApplicationSchema,
  RoleApplicationIdSchema,
} from "@/schemas/role-application.js";
import { UserIdSchema } from "@/schemas/user.js";
import express from "express";

const router = express.Router();

router.use(authenticate);

// Apply for a role (POST /)
router.post(
  "/",
  validate(CreateRoleApplicationSchema, "body"),
  requireRole("user"),
  createRoleApplicationController,
);

// User’s own applications (GET /user)
router.get("/user", getMyApplicationsController);

// Admin – all applications (GET /users)
router.get("/users", requireRole("admin"), getApplicationsController);

// Single application by ID (GET /:applicationId)
router.get(
  "/:applicationId",
  validate(RoleApplicationIdSchema, "params"),
  getApplicationController,
);

// Review an application (POST /:userId)
router.post(
  "/:userId",
  validate(UserIdSchema, "params"),
  requireRole("admin"),
  reviewApplicationController,
);

export default router;
