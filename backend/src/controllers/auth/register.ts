import { Request, Response } from "express";
import { findUserByEmail, createUser } from "@/database/services/user.js";
import { generateSalt, hashPassword } from "@/utils/password.js";
import { generateToken } from "@/utils/token.js";
import { errorResponse } from "@/utils/api-response.js";

export const register = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return errorResponse(res, 400, "Please fill all required fields");
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, 400, "User already exists");
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const newUser = await createUser({
      fullname: fullName,
      email,
      password: hashedPassword,
      salt,
    });

    const token = generateToken({
      userId: newUser.user_id,
      email: newUser.email,
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        user_id: newUser.user_id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return errorResponse(res, 500, "Internal server error");
  }
};
