import { Request, Response } from "express";

import { createUser, findUserByEmail } from "@/database/services/user.js";
import { createUserProfile } from "@/database/services/profile.js";
import { generateSalt, hashPassword } from "@/utils/password.js";
import { generateToken } from "@/utils/token.js";
import { setAuthCookie } from "@/utils/cookie.js";
import { RegisterBody } from "@/schemas/auth.js";

export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { fullName, email, password } = req.body as RegisterBody;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const newUser = await createUser({
      fullname: fullName,
      email,
      password: hashedPassword,
      salt,
    });

    const profile = await createUserProfile({
      user_id: newUser.user_id,
    });

    const token = generateToken({
      userId: newUser.user_id,
      email: newUser.email,
    });

    setAuthCookie(res, token);

    return res.status(201).json({
      message: "User registered successfully",
      data: {
        user_id: newUser.user_id,
        profile_id: profile.user_profile_id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
