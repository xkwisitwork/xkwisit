import { z } from "zod";

export const createSheetDownloadSchema = z.object({
  name: z.string().min(1, "Name is required.").max(120).trim(),
  email: z.string().email("Enter a valid email.").toLowerCase().trim(),
  phone: z
    .string()
    .min(7, "Enter a valid phone number.")
    .max(24)
    .regex(/^[+\d\s()-]+$/, "Only digits, spaces, and +, -, ( ) allowed.")
    .trim(),
  assetKey: z
    .enum([
      "growth-strategy",
      "launch-brand-playbook",
      "ecommerce-cro-blueprint",
    ])
    .optional()
    .default("growth-strategy"),
});

export const sheetDownloadIdParamsSchema = z.object({
  id: z.string().min(1),
});
