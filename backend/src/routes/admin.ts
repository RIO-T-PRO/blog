import { Router } from "express";
import { getAdmin } from "@/controllers/admin.js";

const router = Router();

router.get("/:admin_id", getAdmin);

export default router;
