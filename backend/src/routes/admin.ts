import { Router } from "express";
import { adminDashboard, getAdmin } from "@/controllers/admin.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { adminIdParamSchema } from "@/schemas/admin.js";
import { validate } from "@/middlewares/validate.js";
import { verifyAdmin } from "@/middlewares/verify-admin.js";

const router = Router();

router.use(authMiddleware);

router.get("/me/dashboard", verifyAdmin, adminDashboard);

router.put(
  "me/",
  validate(adminIdParamSchema, "params"),
  verifyAdmin,
  getAdmin,
);

export default router;
