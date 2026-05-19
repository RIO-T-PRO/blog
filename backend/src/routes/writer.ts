import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.js";
import { createPost } from "@/controllers/writer.js";
import { getWriter } from "@/controllers/admin.js";

const router = Router();

// Writer profile
router.get("/:userId", getWriter);
// router.put("/update", authMiddleware, updateWriter);

// Posts
// router.post("/post/create", authMiddleware, createPost);
// router.put("/post/update/:post_id", authMiddleware, updatePost);
// router.delete("/post/delete/:post_id", authMiddleware, deletePost);

export default router;
