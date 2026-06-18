import {
  userDashboard,
  updateUserController,
  deleteUserController,
} from "@/controllers/profile.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { validate } from "@/middlewares/validate.js";
import { verifyUser } from "@/middlewares/verify-user.js";
import {
  dashboardParamsSchema,
  dashboardQuerySchema,
  updateUserParamsSchema,
  updateUserBodySchema,
} from "@/schemas/user.js";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.get(
  "/dashboard/:userId",
  validate(dashboardParamsSchema, "params"),
  validate(dashboardQuerySchema, "query"),
  verifyUser,
  userDashboard,
);

router.put(
  "/:userId",
  validate(updateUserParamsSchema, "params"),
  validate(updateUserBodySchema, "body"),
  verifyUser,
  updateUserController,
);

router.delete(
  "/:userId",
  validate(updateUserParamsSchema, "params"),
  verifyUser,
  deleteUserController,
);

export default router;
