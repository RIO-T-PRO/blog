import { setAccessToken, clearAccessToken } from "@/lib/api/refresh";
import apiFetch from "./index";

import type {
  AuthResponse,
  ProfileResponse,
  SignoutResponse,
  SignupPayload,
  SigninPayload,
} from "@/types/auth";

export const signin = async (payload: SigninPayload) => {
  const response = await apiFetch<AuthResponse>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuth: true,
  });

  setAccessToken(response.data.accessToken);

  return response;
};

export const signup = async (payload: SignupPayload) => {
  const response = await apiFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuth: true,
  });

  setAccessToken(response.data.accessToken);

  return response;
};

export const getProfile = () => apiFetch<ProfileResponse>("/profile");

export const logout = async () => {
  try {
    return await apiFetch<SignoutResponse>("/auth/logout", {
      method: "POST",
    });
  } finally {
    clearAccessToken();
  }
};
