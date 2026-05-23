import { Request, Response } from "express";
import { comparePassword } from "@/utils/password.js";
import { generateToken } from "@/utils/token.js";
import { LoginBody } from "@/schemas/auth.js";
import { findUserByEmail } from "@/database/services/user.js";

export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response,
): Promise<void | Response> => {
  try {
    const { email, password } = req.body as LoginBody;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({
      userId: user.user_id,
      email: user.email,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
