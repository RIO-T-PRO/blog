import { LoginBody } from "@/schemas/auth.js";
import { Request, Response } from "express";
import { findUserByEmail } from "../user.js";
import {
  comparePassword,
  generateToken,
  getExpiresDate,
  hashToken,
  setRefreshTokenCookie,
} from "@/utils/index.js";
import { env } from "@/config/env.js";
import { upsertRefreshToken } from "@/database/services/token.js";

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginBody;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateToken("access", user.id);
    const refreshToken = generateToken("refresh", user.id);
    const expiresAt = getExpiresDate(env.REFRESH_TOKEN_EXPIRES_IN);
    const hashedRefreshToken = hashToken(refreshToken);

    await upsertRefreshToken(user.id, hashedRefreshToken, expiresAt);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({
      message: "Signed in successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.error("Signin error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
