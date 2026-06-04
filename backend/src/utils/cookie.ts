import type { CookieOptions, Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const setAuthCookie = (res: Response, token: string): void => {
  res.cookie("token", token, cookieOptions);
};

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  });
};
