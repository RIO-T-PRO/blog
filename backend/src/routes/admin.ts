import { Router } from "express";
import { adminDashboard, getAdmin } from "@/controllers/admin.js";
import { authMiddleware } from "@/middlewares/auth.js";
import {
  adminDashboardQuerySchema,
  adminIdParamSchema,
} from "@/schemas/admin.js";
import { validate } from "@/middlewares/validate.js";
import { verifyAdmin } from "@/middlewares/verify-admin.js";

const router = Router();

router.use(authMiddleware);

router.get(
  "/dashboard/:adminId",
  validate(adminIdParamSchema, "params"),
  validate(adminDashboardQuerySchema, "query"),
  verifyAdmin,
  adminDashboard,
);

router.get("/", verifyAdmin, getAdmin);

export default router;
