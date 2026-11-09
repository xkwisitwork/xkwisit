import { z } from "zod";

export const runXraySchema = z.object({
  url: z
    .string()
    .min(3, "Enter a website - e.g. yourbrand.com")
    .max(500, "URL is too long"),
});
