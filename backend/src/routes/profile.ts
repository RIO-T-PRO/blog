import {
  getProfileService,
  updateProfileController,
} from "@/controllers/profile.js";
import { authenticate } from "@/middlewares/auth.js";
import { validate } from "@/middlewares/validate.js";
import { UpdateProfileSchema } from "@/schemas/profile.js";
import express from "express";

const router = express.Router();

// profile endpoints
router.get("/profile", getProfileService);

router.post(
  "/",
  validate(UpdateProfileSchema, "body"),
  authenticate,
  updateProfileController,
);

export default router;
