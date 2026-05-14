import { Request, Response } from "express";
import { findUserByEmail, createUser } from "@/database/services/user.js";
import { generateSalt, hashPassword } from "@/utils/password.js";
import { generateToken } from "@/utils/token.js";

export const register = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Check existing user (pure DB service)
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password (using utilities)
    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    // Create user (pure DB service)
    const newUser = await createUser({
      fullname: fullName,
      email,
      password: hashedPassword,
      salt,
    });

    // Generate token (utility)
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
    return res.status(500).json({ message: "Internal server error" });
  }
};
