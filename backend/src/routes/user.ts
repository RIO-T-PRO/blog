import { userDashboard } from "@/controllers/user.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { validate } from "@/middlewares/validate.js";
import { verifyUser } from "@/middlewares/verify-user.js";
import { dashboardParamsSchema, dashboardQuerySchema } from "@/schemas/user.js";
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

export default router;
