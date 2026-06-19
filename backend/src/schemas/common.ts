import { z } from "zod";

export const UUIDSchema = z.string().uuid();
export const RoleIdSchema = z.number().int().positive();

export type UUIDParam = z.infer<typeof UUIDSchema>;
