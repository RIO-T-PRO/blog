import { Request, Response } from "express";

import { comparePassword } from "@/utils/password.js";
import { generateToken } from "@/utils/token.js";
import { setAuthCookie, clearAuthCookie } from "@/utils/cookie.js";

import { LoginBody } from "@/schemas/auth.js";

import { findUserByEmail } from "@/database/services/user.js";
import { findWriterByUserId } from "@/database/services/writer.js";
import { getAdminByUserId } from "@/database/services/admin.js";
import { findProfileByUserId } from "@/database/services/profile.js";

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body as LoginBody;

    clearAuthCookie(res);

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const [profile, writer, admin] = await Promise.all([
      findProfileByUserId(user.user_id),
      findWriterByUserId(user.user_id),
      getAdminByUserId(user.user_id),
    ]);

    const token = generateToken({
      userId: user.user_id,
      email: user.email,
    });

    setAuthCookie(res, token);

    return res.status(200).json({
      message: "Login successful",
      data: {
        user: {
          user_id: user.user_id,
          profile_id: profile?.user_profile_id ?? null,
          fullname: user.fullname,
          email: user.email,
        },
        writer: writer ?? null,
        admin: admin ?? null,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    clearAuthCookie(res);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
