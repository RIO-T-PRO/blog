import apiFetch from "./index";
import type {
  CreateRoleApplicationPayload,
  ReviewRoleApplicationPayload,
  CreateRoleApplicationResponse,
  GetMyApplicationsResponse,
  GetAllApplicationsResponse,
  GetApplicationResponse,
  ReviewApplicationResponse,
} from "@/types/role-application";

/**
 * Apply for a role (user).
 * POST /role/applications
 *
 * Payload example:
 * {
 *   roleName: "writer",   // the human-readable role name, resolved by the server
 *   message?: "optional explanation"
 * }
 */
export const createRoleApplication = (payload: CreateRoleApplicationPayload) =>
  apiFetch<CreateRoleApplicationResponse>("/role/applications", {
    method: "POST",
    body: JSON.stringify(payload),
  });

/**
 * Fetch the authenticated user’s own applications.
 * GET /role/applications/user
 */
export const getMyApplications = () =>
  apiFetch<GetMyApplicationsResponse>("/role/applications/user");

/**
 * Fetch all applications (admin only).
 * GET /role/applications/users
 */
export const getAllApplications = () =>
  apiFetch<GetAllApplicationsResponse>("/role/applications/users");

/**
 * Fetch a single application by ID.
 * GET /role/applications/:applicationId
 * Accessible by the owner or an admin.
 */
export const getApplication = (applicationId: string) =>
  apiFetch<GetApplicationResponse>(`/role/applications/${applicationId}`);

/**
 * Review (approve/reject/cancel) an application (admin only).
 * POST /role/applications/:userId
 */
export const reviewApplication = (
  userId: string,
  payload: ReviewRoleApplicationPayload,
) =>
  apiFetch<ReviewApplicationResponse>(`/role/applications/${userId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
