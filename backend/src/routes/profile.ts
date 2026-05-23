import { Router } from "express";
import {
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUserProfile,
} from "@/controllers/profile.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { verifyProfile } from "@/middlewares/verify-profile.js";
import { validate } from "@/middlewares/validate.js";
import {
  createProfileBodySchema,
  profileIdParamSchema,
  updateProfileBodySchema,
} from "@/schemas/profile.js";

const router = Router();

router.use(authMiddleware);

router.post("/", validate(createProfileBodySchema, "body"), createUserProfile);

router.get(
  "/:profile_id",
  validate(profileIdParamSchema, "params"),
  verifyProfile,
  getUserProfile,
);

router.put(
  "/:profile_id",
  validate(updateProfileBodySchema, "body"),
  validate(profileIdParamSchema, "params"),
  verifyProfile,
  updateUserProfile,
);

router.delete(
  "/:profile_id",
  validate(profileIdParamSchema, "params"),
  verifyProfile,
  deleteUserProfile,
);

export default router;
