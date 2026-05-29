import { Router } from "express";

import {
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUserProfile,
  getCurrentUserProfile,
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

/* CURRENT AUTHENTICATED USER PROFILE */
router.get("/", verifyUser, getCurrentUserProfile);

/* CREATE PROFILE */
router.post(
  "/",
  validate(createProfileBodySchema, "body"),
  verifyUser,
  createUserProfile,
);

/* PUBLIC/PROFILE BY ID */
router.get(
  "/:profileId",
  validate(profileIdParamSchema, "params"),
  verifyUser,
  getUserProfile,
);

/* UPDATE PROFILE */
router.put(
  "/:profileId",
  validate(profileIdParamSchema, "params"),
  validate(updateProfileBodySchema, "body"),
  verifyUser,
  updateUserProfile,
);

/* DELETE PROFILE */
router.delete(
  "/:profileId",
  validate(profileIdParamSchema, "params"),
  verifyUser,
  deleteUserProfile,
);

export default router;
