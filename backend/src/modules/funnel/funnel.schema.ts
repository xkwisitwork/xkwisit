import { z } from "zod";

export const idParamsSchema = z.object({
  id: z.string().min(1),
});

export const createSchema = z
  .object({
    name: z.string().min(1).optional(),
  })
  .passthrough();

export const updateSchema = createSchema.partial();
