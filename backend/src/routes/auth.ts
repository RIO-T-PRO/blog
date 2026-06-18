import { refreshToken } from "@/controllers/auth/refresh.js";
import { signin } from "@/controllers/auth/signin.js";
import { signout } from "@/controllers/auth/signout.js";
import { signup } from "@/controllers/auth/signup.js";
import { authenticate } from "@/middlewares/auth.js";
import { validate } from "@/middlewares/validate.js";
import { SigninSchema, SignupSchema } from "@/schemas/user.js";
import express from "express";

const router = express.Router();

router.post("/signup", validate(SignupSchema, "body"), signup);
router.post("/signin", validate(SigninSchema, "body"), signin);
router.post("/logout", signout);
router.post("/refresh", authenticate, refreshToken);

export default router;
