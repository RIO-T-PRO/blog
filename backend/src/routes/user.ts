import { userDashboard } from "@/controllers/user.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { validate } from "@/middlewares/validate.js";
import { dashboardQuerySchema } from "@/schemas/user.js";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.get("/dashboard", validate(dashboardQuerySchema), userDashboard);

export default router;
