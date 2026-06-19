import { z } from "zod";

export const UUIDSchema = z.string().uuid();

export type UUIDParam = z.infer<typeof UUIDSchema>;
