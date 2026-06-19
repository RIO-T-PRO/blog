import { z } from "zod";
import { UUIDSchema } from "./common.js";

export const CreateRoleSchema = z.object({
  name: z.string().min(2),
  description: z.string().nullable().optional(),
});

export const UpdateRoleSchema = CreateRoleSchema.partial();

export const RoleIdParam = z.object({
  roleId: UUIDSchema,
});

export type CreateRole = z.infer<typeof CreateRoleSchema>;
export type UpdateRole = z.infer<typeof UpdateRoleSchema>;
export type RoleIdParam = z.infer<typeof RoleIdParam>;
