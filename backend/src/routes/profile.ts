import { Router } from "express";
import {
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUserProfile,
} from "@/controllers/profile.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { validate } from "@/middlewares/validate.js";
import {
  createProfileBodySchema,
  profileIdParamSchema,
  updateProfileBodySchema,
} from "@/schemas/profile.js";
import { verifyUser } from "@/middlewares/verify-user.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createProfileBodySchema, "body"),
  verifyUser,
  createUserProfile,
);

router.get(
  "/:profileId",
  validate(profileIdParamSchema, "params"),
  verifyUser,
  getUserProfile,
);

router.put(
  "/:profileId",
  validate(profileIdParamSchema, "params"),
  validate(updateProfileBodySchema, "body"),
  verifyUser,
  updateUserProfile,
);

router.delete(
  "/:profileId",
  validate(profileIdParamSchema, "params"),
  verifyUser,
  deleteUserProfile,
);

export default router;
