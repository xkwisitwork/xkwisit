import { z } from "zod";

export const orgIdParamsSchema = z.object({
  id: z.string().min(1),
});
