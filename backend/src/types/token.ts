export interface TokenPayload {
  id: string;
  roles?: string[];
  iat: number;
  exp: number;
}

export type TokenType = "access" | "refresh";
