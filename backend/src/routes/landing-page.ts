// src/routes/landing.routes.ts
import { Router } from "express";
import { LandingController } from "@/controllers/landing-page.js";

const router = Router();
const landingController = new LandingController();

router.get("/posts", landingController.getPosts);
router.get("/posts/:slug", landingController.getPostBySlug);

export default router;
