import { z } from "zod";

export const idParamsSchema = z.object({
  id: z.string().min(1),
});

export const orgIdParamsSchema = z.object({
  orgId: z.string().min(1),
});
