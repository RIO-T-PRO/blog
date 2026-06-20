import { z } from "zod";
import { UUIDSchema } from "./common.js";

export const RoleApplicationStatusSchema = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
]);

export const CreateRoleApplicationSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
  message: z.string().optional(),
});

export const UpdateRoleApplicationSchema = z.object({
  status: RoleApplicationStatusSchema,
  message: z.string().optional(),
  // reviewedById is usually set by the system, not by the user – omit from public update
});

export const RoleApplicationIdSchema = z.object({
  applicationId: UUIDSchema,
});

export type ReviewRoleApplicationBody = z.infer<
  typeof UpdateRoleApplicationSchema
>;

export type CreateRoleApplication = z.infer<typeof CreateRoleApplicationSchema>;
export type UpdateRoleApplication = z.infer<typeof UpdateRoleApplicationSchema>;
export type RoleApplicationIdParam = z.infer<typeof RoleApplicationIdSchema>;
