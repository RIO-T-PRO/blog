import jwt from "jsonwebtoken";
import crypto from "crypto";
import { TokenPayload, TokenType, UserRoleRelation } from "@/types/token.js";
import { env } from "@/config/env.js";

export const generateToken = (
  type: TokenType,
  userId: string,
  roles: string[] = [],
): string => {
  const { secret, expiresIn } = getToken(type);

  const payload = type === "access" ? { id: userId, roles } : { id: userId };

  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (type: TokenType, token: string): TokenPayload => {
  const { secret } = getToken(type);
  return jwt.verify(token, secret) as TokenPayload;
};

export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const getToken = (type: TokenType) => {
  return {
    secret:
      type === "access" ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET,
    expiresIn:
      type === "access"
        ? Number(env.ACCESS_TOKEN_EXPIRES_IN)
        : Number(env.REFRESH_TOKEN_EXPIRES_IN),
  };
};

export const getExpiresDate = (type: TokenType): Date => {
  const expiresInSeconds =
    type === "access"
      ? Number(env.ACCESS_TOKEN_EXPIRES_IN)
      : Number(env.REFRESH_TOKEN_EXPIRES_IN);
  return new Date(Date.now() + expiresInSeconds * 1000);
};

export const extractRoleNames = (userRoles: UserRoleRelation): string[] => {
  return userRoles.map((ur) => ur.role.name);
};
