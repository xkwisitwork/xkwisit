import { z } from "zod";

import { INDUSTRIES } from "@/lib/constants/industries";
import { LIFECYCLE_STAGE_ORDER } from "@/lib/constants/funnel-stages";

/**
 * Client schemas.
 * Cover creation, updates, and the nested business-info form.
 */

const optionalUrl = z
  .string()
  .url("Enter a valid URL (include https://).")
  .optional()
  .or(z.literal(""));

const optionalString = (max = 500) =>
  z.string().max(max).trim().optional().or(z.literal(""));

const moneySchema = z.object({
  amount: z.coerce.number().nonnegative("Amount cannot be negative."),
  currency: z.enum(["NGN", "USD", "GBP", "EUR"]).default("NGN"),
});

/* ─── Create ─────────────────────────────────────────── */

export const createClientSchema = z.object({
  name: z.string().min(2, "Client name is required.").max(120).trim(),
  legalName: optionalString(160),
  industry: z.enum(INDUSTRIES, {
    errorMap: () => ({ message: "Select an industry." }),
  }),
  website: optionalUrl,
  tier: z.enum(["STANDARD", "PREMIUM", "ENTERPRISE"]).default("STANDARD"),
  lifecycleStage: z
    .enum(LIFECYCLE_STAGE_ORDER as unknown as [string, ...string[]])
    .optional(),
  accountManagerId: z.string().optional(),
  strategistId: z.string().optional(),
  retainerAmount: moneySchema.optional(),
  contractStartDate: z.string().optional(),
  contractEndDate: z.string().optional(),
  notes: optionalString(2000),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;

/* ─── Update ─────────────────────────────────────────── */

export const updateClientSchema = createClientSchema.partial().extend({
  status: z.enum(["ACTIVE", "PAUSED", "CHURNED", "PROSPECT", "ARCHIVED"]).optional(),
});

export type UpdateClientInput = z.infer<typeof updateClientSchema>;

/* ─── Business info ──────────────────────────────────── */

export const competitorSchema = z.object({
  name: z.string().min(1, "Competitor name is required."),
  website: optionalUrl,
  notes: optionalString(500),
  strengths: z.array(z.string()).max(10).default([]),
  weaknesses: z.array(z.string()).max(10).default([]),
});

export const locationSchema = z.object({
  label: z.string().min(1, "Location label is required."),
  address: z.string().min(1, "Address is required."),
  city: z.string().min(1, "City is required."),
  state: optionalString(80),
  country: z.string().min(1, "Country is required."),
  isPrimary: z.boolean().default(false),
});

export const clientBusinessInfoSchema = z.object({
  description: optionalString(1500),
  foundedYear: z.coerce.number().int().min(1800).max(new Date().getFullYear()).optional(),
  employeeCount: z.coerce.number().int().nonnegative().optional(),
  revenueRange: optionalString(80),
  targetMarket: optionalString(500),
  valueProposition: optionalString(500),
  productsServices: z.array(z.string()).max(50).default([]),
  competitors: z.array(competitorSchema).max(20).default([]),
  locations: z.array(locationSchema).max(20).default([]),
});

export type ClientBusinessInfoInput = z.infer<typeof clientBusinessInfoSchema>;

/* ─── Contact ────────────────────────────────────────── */

export const clientContactSchema = z.object({
  firstName: z.string().min(1, "First name is required.").max(60).trim(),
  lastName: z.string().min(1, "Last name is required.").max(60).trim(),
  email: z.string().email("Enter a valid email address.").toLowerCase().trim(),
  phone: z
    .string()
    .min(6, "Enter a valid phone number.")
    .max(20)
    .regex(/^[+\d\s()-]+$/, "Only digits, spaces, and +, -, ( ) allowed.")
    .optional()
    .or(z.literal("")),
  jobTitle: optionalString(80),
  isPrimary: z.boolean().default(false),
  receivesReports: z.boolean().default(true),
  receivesInvoices: z.boolean().default(true),
});

export type ClientContactInput = z.infer<typeof clientContactSchema>;

/* ─── Access grant ───────────────────────────────────── */

export const clientAccessSchema = z.object({
  provider: z.string().min(1, "Select a provider."),
  label: z.string().min(1, "Give this access a label.").max(120),
  status: z.enum(["PENDING", "GRANTED", "REVOKED", "ERROR"]).default("PENDING"),
  grantedToUserId: z.string().optional(),
  accountIdentifier: optionalString(160),
  notes: optionalString(500),
});

export type ClientAccessInput = z.infer<typeof clientAccessSchema>;

/* ─── Onboarding checklist ──────────────────────────── */

export const onboardingItemSchema = z.object({
  id: z.string(),
  section: z.enum(["business", "digital", "brand", "access"]),
  label: z.string(),
  completed: z.boolean().default(false),
  completedAt: z.string().optional(),
  completedById: z.string().optional(),
  notes: optionalString(500),
});

export const onboardingChecklistSchema = z.object({
  clientId: z.string(),
  items: z.array(onboardingItemSchema),
  completedAt: z.string().optional(),
});

export type OnboardingChecklistInput = z.infer<typeof onboardingChecklistSchema>;
