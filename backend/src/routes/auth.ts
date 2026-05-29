import express from "express";

import { register } from "@/controllers/auth/register.js";
import { login } from "@/controllers/auth/login.js";
import { validate } from "@/middlewares/validate.js";
import { loginBodySchema, registerBodySchema } from "@/schemas/auth.js";

const router = express.Router();

router.post("/signup", validate(registerBodySchema, "body"), register);
router.post("/signin", validate(loginBodySchema, "body"), login);

export default router;
