import { Router } from "express";

import { authMiddleware } from "@/middlewares/auth.js";
import { ensureNotWriter } from "@/middlewares/verify-writer.js";
import { ensureNoWriterApplication } from "@/middlewares/writer-application-pending.js";
import { applyWriter } from "@/controllers/writer-application.js";
import { validate } from "@/middlewares/validate.js";
import { applyWriterSchema } from "@/schemas/application.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/apply",
  validate(applyWriterSchema, "body"),
  ensureNotWriter,
  ensureNoWriterApplication,
  applyWriter,
);

export default router;
