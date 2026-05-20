import { Router } from "express";
import {
  createWriter,
  updateWriter,
  deleteWriter,
  getWriter,
} from "@/controllers/writer.js";
import { authMiddleware } from "@/middlewares/auth.js";

const router = Router();

router.get("/:writer_id", getWriter);

router.put("/", authMiddleware, updateWriter);

// admin only
router.post("/user_id", authMiddleware, createWriter);
router.delete("/:user_id", authMiddleware, deleteWriter);

export default router;
