import { Response } from "express";

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
};
export type ApiError = {
  success: false;
  message: string;
  errors?: unknown;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export const resSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode: number = 200,
  meta?: PaginationMeta,
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  };

  return res.status(statusCode).json(response);
};

export const resError = (
  res: Response,
  message = "Error",
  statusCode: number = 500,
  errors?: unknown,
) => {
  const response: ApiResponse<never> = {
    success: false,
    message,
    errors,
  };

  return res.status(statusCode).json(response);
};
