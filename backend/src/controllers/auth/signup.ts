import { env } from "@/config/env.js";
import { upsertRefreshToken } from "@/database/services/token.js";
import { createUser, findUserByEmail } from "@/database/services/user.js";
import {
  CreateUser,
  SignupInput,
  SignupSchema,
} from "@/schemas/user.schema.js";
import {
  generateToken,
  getExpiresDate,
  hashPassword,
  hashToken,
  resError,
  resSuccess,
  setRefreshTokenCookie,
} from "@/utils/index.js";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as SignupInput;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return resError(res, "Email already in use", 409);
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = generateToken("access", user.id);
    const refreshToken = generateToken("refresh", user.id);
    const expiresAt = getExpiresDate("refresh");
    const hashedRefreshToken = hashToken(refreshToken);

    await upsertRefreshToken(user.id, hashedRefreshToken, expiresAt);
    setRefreshTokenCookie(res, refreshToken);

    return resSuccess(
      res,
      {
        data: { user: { id: user.id } },
        accessToken,
      },
      "User created successfully",
      201,
    );
  } catch (error) {
    console.error("Signup error", error);
    return resError(res, "Internal server error", 500);
  }
};
