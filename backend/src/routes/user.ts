import { getProfile } from "@/controllers/profile.js";
import { authenticate } from "@/middlewares/auth.js";
import { requireRole } from "@/middlewares/role-require.js";
import { validate } from "@/middlewares/validate.js";
import { UpdateProfileSchema } from "@/schemas/profile.js";
import express from "express";

const router = express.Router();

// profile endpoints
router.get("/profile", getProfile);
router.post(
  "/profile/update",
  validate(UpdateProfileSchema, "body"),
  authenticate,
  requireRole("admin", "writer", "user"),
);

export default router;
