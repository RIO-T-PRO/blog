import { Request, Response } from "express";
import { createUser, findUserByEmail } from "@/database/services/user.js";
import { generateSalt, hashPassword } from "@/utils/password.js";
import { generateToken } from "@/utils/token.js";
import { RegisterBody } from "@/schemas/auth.js";

export const register = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  try {
    const { fullName, email, password } = req.body as RegisterBody;

    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

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
    return res.status(500).json({ error: "Internal server error" });
  }
};
