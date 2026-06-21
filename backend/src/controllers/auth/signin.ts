import { Request, Response } from "express";
import {
  comparePassword,
  generateToken,
  getExpiresDate,
  hashToken,
  resError,
  resSuccess,
  setRefreshTokenCookie,
} from "@/utils/index.js";
import { upsertRefreshToken } from "@/database/services/token.js";
import { SigninInput } from "@/schemas/user.js";
import {
  findUserByEmail,
  findUserWithRoleAndProfile,
} from "@/database/services/user.js";
import { getUserProfile } from "@/database/services/profile.js";

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as SigninInput;

    const user = await findUserByEmail(email);
    if (!user) {
      return resError(res, "Invalid credentials", 401);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return resError(res, "Invalid credentials", 401);
    }

    const userWith = await findUserWithRoleAndProfile(user.id);
    const roles = userWith?.user.roles ?? [];

    const accessToken = generateToken("access", user.id, roles);
    const refreshToken = generateToken("refresh", user.id);

    const expiresAt = getExpiresDate("refresh");
    const hashedRefreshToken = hashToken(refreshToken);

    await upsertRefreshToken(user.id, hashedRefreshToken, expiresAt);
    setRefreshTokenCookie(res, refreshToken);

    return resSuccess(
      res,
      {
        data: { user: userWith?.user, profile: userWith?.profile, accessToken },
      },
      "Signed in successfully",
      200,
    );
  } catch (error) {
    console.error("Signin error", error);
    return resError(res, "Internal server error", 500);
  }
};
