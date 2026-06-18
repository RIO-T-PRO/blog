import { z } from "zod";

export const UUIDSchema = z.string().uuid();
export const RoleIdSchema = z.number().int().positive(); // matches Prisma Int
