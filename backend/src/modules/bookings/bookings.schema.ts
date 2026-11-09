import { z } from "zod";

export const createBookingSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  company: z.string().max(160).optional().default(""),
  dayKey: z.string().min(1),
  slotId: z.string().min(1),
  timezone: z.string().default("Africa/Lagos"),
  notes: z.string().max(2000).optional(),
});

export const bookingIdParamsSchema = z.object({
  id: z.string().min(1),
});
