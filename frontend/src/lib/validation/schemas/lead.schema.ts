import { z } from "zod";

import { LEAD_SOURCES } from "@/lib/constants/funnel-stages";
import { LEAD_STATUSES } from "@/lib/constants/statuses";

/**
 * Lead schemas.
 * Used by create/edit forms and by the API route handlers.
 */

const phoneSchema = z
  .string()
  .min(6, "Enter a valid phone number.")
  .max(20)
  .regex(/^[+\d\s()-]+$/, "Only digits, spaces, and +, -, ( ) allowed.");

const optionalUrl = z
  .string()
  .url("Enter a valid URL (include https://).")
  .optional()
  .or(z.literal(""));

const optionalString = (max = 500) =>
  z.string().max(max).trim().optional().or(z.literal(""));

/* ─── Create ─────────────────────────────────────────── */

export const createLeadSchema = z.object({
  firstName: z.string().min(1, "First name is required.").max(60).trim(),
  lastName: z.string().min(1, "Last name is required.").max(60).trim(),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address.")
    .toLowerCase()
    .trim(),
  phone: phoneSchema.optional().or(z.literal("")),
  company: z.string().min(1, "Company name is required.").max(120).trim(),
  website: optionalUrl,
  jobTitle: optionalString(80),
  industry: z.string().min(1, "Select an industry."),
  source: z.enum(LEAD_SOURCES, {
    errorMap: () => ({ message: "Select a lead source." }),
  }),
  serviceInterest: z.string().optional(),
  budgetRange: z.string().optional(),
  notes: optionalString(2000),
  ownerId: z.string().optional(),
  tags: z.array(z.string()).max(10).optional().default([]),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

/* ─── Update ─────────────────────────────────────────── */

export const updateLeadSchema = createLeadSchema.partial().extend({
  status: z.enum(Object.values(LEAD_STATUSES) as [string, ...string[]]).optional(),
  score: z.number().min(0).max(100).optional(),
  nextFollowUpAt: z.string().datetime().optional(),
});

export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;

/* ─── Bulk import ────────────────────────────────────── */

export const leadImportRowSchema = createLeadSchema;

export type LeadImportRow = z.infer<typeof leadImportRowSchema>;

export const leadImportPayloadSchema = z.object({
  rows: z.array(leadImportRowSchema).min(1, "Upload at least one row.").max(500),
  source: z.enum(LEAD_SOURCES),
  defaultOwnerId: z.string().optional(),
  skipDuplicates: z.boolean().default(true),
});

export type LeadImportPayload = z.infer<typeof leadImportPayloadSchema>;

/* ─── Filters ────────────────────────────────────────── */

export const leadFilterSchema = z.object({
  search: z.string().optional(),
  status: z.array(z.string()).optional(),
  source: z.array(z.string()).optional(),
  ownerId: z.string().optional(),
  industry: z.string().optional(),
  scoreMin: z.coerce.number().min(0).max(100).optional(),
  scoreMax: z.coerce.number().min(0).max(100).optional(),
  createdFrom: z.string().optional(),
  createdTo: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
});

export type LeadFilterInput = z.infer<typeof leadFilterSchema>;

/* ─── Bulk actions ───────────────────────────────────── */

export const bulkLeadActionSchema = z.object({
  ids: z.array(z.string()).min(1, "Select at least one lead."),
  action: z.enum(["archive", "delete", "assign", "change-status"]),
  payload: z
    .object({
      ownerId: z.string().optional(),
      status: z.string().optional(),
    })
    .optional(),
});

export type BulkLeadActionInput = z.infer<typeof bulkLeadActionSchema>;
