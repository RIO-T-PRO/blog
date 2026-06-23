import { deleteUserController } from "@/controllers/auth/delete-user.js";
import {
  getProfileService,
  updateProfileController,
} from "@/controllers/profile.js";
import { authenticate } from "@/middlewares/auth.js";
import { requireRole } from "@/middlewares/role-require.js";
import { validate } from "@/middlewares/validate.js";
import { UpdateProfileSchema } from "@/schemas/profile.js";
import { UserIdSchema } from "@/schemas/user.js";
import express from "express";

const router = express.Router();

// profile endpoints

router.use(authenticate);

router.get("/profile", getProfileService);

router.post(
  "/profile/update",
  validate(UpdateProfileSchema, "body"),
  updateProfileController,
);

router.delete(
  "/delete/:userId",
  validate(UserIdSchema, "params"),
  requireRole("user", "admin"),
  deleteUserController,
);

export default router;
