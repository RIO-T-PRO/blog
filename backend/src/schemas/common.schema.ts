import { z } from "zod";

/**
 * Generic UUID
 */
export const IdSchema = z.uuid();

export type Id = z.infer<typeof IdSchema>;

/**
 * Generic params
 */
export const IdParamSchema = z.object({
  id: IdSchema,
});

export type IdParam = z.infer<typeof IdParamSchema>;

/**
 * UUID param unions
 */
export const EntityIdParamSchema = z.union([
  z.object({ userId: IdSchema }),
  z.object({ profileId: IdSchema }),
  z.object({ articleId: IdSchema }),
  z.object({ commentId: IdSchema }),
]);

export type EntityIdParam = z.infer<typeof EntityIdParamSchema>;
