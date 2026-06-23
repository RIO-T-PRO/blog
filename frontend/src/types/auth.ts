import type { ApiSuccess } from "./api";

export type ID = string;

/**
 * Domain Types
 */
export type User = {
  id: ID;
  email: string;
  roles: string[];
};

export type Profile = {
  id: ID;
  userId: ID;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Request Payloads
 */
export type SigninPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type UpdateProfilePayload = {
  username?: string;
  bio?: string | null;
  avatarUrl?: string | null;
  website?: string | null;
};

/**
 * Response Payloads
 */
export type AuthData = {
  user: User;
  profile: Profile | null;
  accessToken: string;
};

export type ProfileData = {
  user: User;
  profile: Profile | null;
};

export type RefreshTokenData = {
  accessToken: string;
};

export type SignoutData = null;

/**
 * Endpoint Responses
 */
export type AuthResponse = ApiSuccess<AuthData>;

export type ProfileResponse = ApiSuccess<ProfileData>;

export type RefreshTokenResponse = ApiSuccess<RefreshTokenData>;

export type SignoutResponse = ApiSuccess<SignoutData>;
