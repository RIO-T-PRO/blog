import { Request, Response } from "express";
import { findUserByEmail } from "@/database/services/user.js";
import { comparePassword } from "@/utils/password.js";
import { generateToken } from "@/utils/token.js";
import { errorResponse } from "@/utils/api-response.js";

export const login = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, "Please provide email and password");
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return errorResponse(res, 401, "Invalid credentials");
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
    return errorResponse(res, 500, "Internal server error");
  }
};
