import { Response } from "express";

export const errorResponse = (
  res: Response,
  status: number,
  message: string,
): Response => {
  return res.status(status).json({ status: "error", message });
};
