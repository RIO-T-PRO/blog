import apiFetch from "@/lib/api";

import type {
  ProfileResponse,
  AuthResponse,
  SignupPayload,
  SigninPayload,
  WriterApplication,
  ApplyWriterPayload,
} from "@/types/auth";

export const signup = (payload: SignupPayload) =>
  apiFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const signin = (payload: SigninPayload) =>
  apiFetch<AuthResponse>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getProfile = () => apiFetch<ProfileResponse>("/profile");

export const logout = () =>
  apiFetch<{ message: string }>("/auth/logout", {
    method: "POST",
  });

// export const updateProfile = (
//   profileId: string,
//   payload: UpdateProfilePayload,
// ) =>
//   apiFetch<ProfileResponse>(`/profile/${profileId}`, {
//     method: "PATCH",
//     body: JSON.stringify(payload),
//   });

export const applyWriter = (payload: ApplyWriterPayload) =>
  apiFetch<{
    status: string;
    data: {
      application: WriterApplication;
    };
  }>("/application/apply", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getMyWriterApplication = () =>
  apiFetch<{
    status: string;
    data: {
      application: WriterApplication | null;
    };
  }>("/application/me");
