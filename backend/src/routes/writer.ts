import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.js";
import {
  isAdminOrWriterOwner,
  verifyAdmin,
} from "@/middlewares/verify-admin.js";
import { verifyWriter } from "@/middlewares/verify-writer.js";
import {
  createWriter,
  updateWriter,
  deleteWriter,
  getWriter,
  writerDashboard,
} from "@/controllers/writer.js";
import { validate } from "@/middlewares/validate.js";
import {
  createWriterSchema,
  updateWriterBodySchema,
  writerDashboardQuerySchema,
  writerIdParamSchema,
} from "@/schemas/writer.js";

const router = Router();

router.use(authMiddleware);

// Admin only
router.post(
  "/",
  validate(createWriterSchema, "body"),
  verifyAdmin,
  createWriter,
);

router.put(
  "/",
  validate(updateWriterBodySchema, "body"),
  verifyWriter,
  updateWriter,
);

// Delete: admin or writer owner
router.delete(
  "/:writerId",
  validate(writerIdParamSchema, "params"),
  isAdminOrWriterOwner,
  deleteWriter,
);

router.get("/:writerId", validate(writerIdParamSchema, "params"), getWriter);

// Writer's own dashboard
router.get(
  "/dashboard",
  validate(writerDashboardQuerySchema, "body"),
  verifyWriter,
  writerDashboard,
);

export default router;
