import { z } from "zod";

import { ORG_PLANS, ORG_STATUSES } from "../../models/Organization.js";

export const updateWorkspaceSchema = z.object({
  plan: z.enum(ORG_PLANS).optional(),
  status: z.enum(ORG_STATUSES).optional(),
  seatsIncluded: z.number().int().min(1).max(500).optional(),
  trialEndsAt: z.string().datetime().optional().nullable(),
});

export const extendTrialSchema = z.object({
  days: z.number().int().min(1).max(90).optional(),
});

export const workspaceIdParamsSchema = z.object({
  id: z.string().min(1),
});

export const userIdParamsSchema = z.object({
  id: z.string().min(1),
});

export const setPlatformAdminSchema = z.object({
  isPlatformAdmin: z.boolean(),
});
