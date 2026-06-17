import { env } from "@/config/env.js";
import { upsertRefreshToken } from "@/database/services/token.js";
import { createUser, findUserByEmail } from "@/database/services/user.js";
import { RegisterBody } from "@/schemas/auth.js";
import {
  generateToken,
  getExpiresDate,
  hashPassword,
  hashToken,
  setRefreshTokenCookie,
} from "@/utils/index.js";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as RegisterBody;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      name: name,
      email: email,
      password: password,
    });

    const accessToken = generateToken("access", user.id);
    const refreshToken = generateToken("refresh", user.id);
    const expiresAt = getExpiresDate(env.REFRESH_TOKEN_EXPIRES_IN);
    const hashedRefreshToken = hashToken(refreshToken);

    await upsertRefreshToken(user.id, hashedRefreshToken, expiresAt);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
      message: "User created successfully",
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
    console.error("Signup error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
