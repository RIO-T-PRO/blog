import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.js";
import { writerMiddleware } from "@/middlewares/writer.js";
import { updateWriter } from "@/controllers/writer.js";

const router = Router();

router.put("/", authMiddleware, writerMiddleware, updateWriter);

export default router;
