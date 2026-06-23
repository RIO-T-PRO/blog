import { setAccessToken, clearAccessToken } from "@/lib/api/refresh";
import apiFetch from "./index";

import type {
  AuthResponse,
  ProfileResponse,
  SignoutResponse,
  SignupPayload,
  SigninPayload,
  UpdateProfilePayload,
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

export const getProfile = () => apiFetch<ProfileResponse>("/user/profile");

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const cleanedPayload = {
    ...payload,
    website: payload.website?.trim() || null,
    avatarUrl: payload.avatarUrl?.trim() || null,
  };

  const response = await apiFetch<ProfileResponse>("/user/profile/update", {
    method: "POST",
    body: JSON.stringify(cleanedPayload),
  });
  return response;
};

export const logout = async () => {
  try {
    return await apiFetch<SignoutResponse>("/auth/logout", {
      method: "POST",
    });
  } finally {
    clearAccessToken();
  }
};

/**
 * Delete a user account by ID.
 * @param userId - The ID of the user to delete.
 * @returns The API response (typically a success message).
 */

export const deleteUser = async (userId: string) => {
  try {
    return await apiFetch<SignoutResponse>(`/user/delete/${userId}`, {
      method: "DELETE",
    });
  } finally {
    // Clear tokens only if the deleted user is the currently authenticated user.
    // We'll handle that logic in the context to avoid unnecessary token removal.
  }
};
