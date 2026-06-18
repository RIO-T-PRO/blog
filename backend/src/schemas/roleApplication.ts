import { z } from "zod";
import { UUIDSchema, RoleIdSchema } from "./common.js";

export const RoleApplicationStatusSchema = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
]);

export const CreateRoleApplicationSchema = z.object({
  userId: UUIDSchema,
  roleId: RoleIdSchema,
  message: z.string().optional(),
});

export const UpdateRoleApplicationSchema = z.object({
  status: RoleApplicationStatusSchema,
  message: z.string().optional(),
  // reviewedById is usually set by the system, not by the user – omit from public update
});

export const RoleApplicationIdParam = z.object({
  applicationId: UUIDSchema,
});

export type CreateRoleApplication = z.infer<typeof CreateRoleApplicationSchema>;
export type UpdateRoleApplication = z.infer<typeof UpdateRoleApplicationSchema>;
