import { z } from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1),
  status: z.string().optional(),
  description: z.string().nullable().optional(),
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;
