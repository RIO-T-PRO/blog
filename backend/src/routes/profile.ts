import { getUserProfile } from "@/database/services/profile.js";
import express from "express";

const router = express.Router();

router.get("/profile", getUserProfile);

export default router;
