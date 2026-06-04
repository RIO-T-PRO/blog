import {
  applyWriter,
  getAllApplications,
  getApplyWriter,
  getCurrentUserApplication,
} from "@/controllers/writer-application.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { validate } from "@/middlewares/validate.js";
import { verifyAdmin } from "@/middlewares/verify-admin.js";
import {
  ensureApplicationOwnership,
  ensureNoWriterApplication,
} from "@/middlewares/writer-application-pending.js";
import {
  applyWriterSchema,
  writerApplicationIdParamSchema,
} from "@/schemas/application.js";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.post(
  "/apply",
  validate(applyWriterSchema, "body"),
  ensureNoWriterApplication,
  applyWriter,
);

router.get("/me", getCurrentUserApplication);
router.get("/", verifyAdmin, getAllApplications);

// Get specific application by ID (Owner or Admin)
router.get(
  "/:applicationId",
  validate(writerApplicationIdParamSchema, "params"),
  ensureApplicationOwnership,
  getApplyWriter,
);

export default router;
