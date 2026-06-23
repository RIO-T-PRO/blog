import type { ApiSuccess } from "./api";

export type RoleApplicationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";

export interface RoleApplication {
  id: string;
  userId: string;
  roleId: string;
  status: RoleApplicationStatus;
  message?: string | null;
  createdAt: string;
  updatedAt: string;
  // Included by backend joins
  user?: {
    id: string;
    name: string;
    email: string;
  };
  role?: {
    id: string;
    name: string;
  };
}

// ---- Payloads ----

export interface CreateRoleApplicationPayload {
  roleName: string;
  message?: string;
}

export interface ReviewRoleApplicationPayload {
  status: Exclude<RoleApplicationStatus, "PENDING">;
  message?: string;
}

export type CreateRoleApplicationResponse = ApiSuccess<{
  application: RoleApplication;
}>;

export type GetMyApplicationsResponse = ApiSuccess<{
  applications: RoleApplication[];
}>;

export type GetAllApplicationsResponse = ApiSuccess<{
  applications: RoleApplication[];
}>;

export type GetApplicationResponse = ApiSuccess<{
  application: RoleApplication;
}>;

export type ReviewApplicationResponse = ApiSuccess<{
  updated: RoleApplication;
}>;
