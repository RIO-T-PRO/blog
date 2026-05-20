import { Router } from "express";
import {
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUserProfile,
} from "@/controllers/profile.js";
import { authMiddleware } from "@/middlewares/auth.js";

const router = Router();

router.get("/:profile_id", authMiddleware, getUserProfile);

router.post("/", authMiddleware, createUserProfile);
router.put("/:profile_id", authMiddleware, updateUserProfile);
router.delete("/:profile_id", authMiddleware, deleteUserProfile);

export default router;
