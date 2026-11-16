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

/** Client must send an explicit confirmation — browser-only dialogs are not enough. */
export const setPlatformAdminSchema = z.object({
  isPlatformAdmin: z.boolean(),
  confirm: z.literal(true, {
    errorMap: () => ({
      message: "Confirmation required to promote or demote an admin",
    }),
  }),
  confirmAction: z.enum(["PROMOTE_ADMIN", "DEMOTE_USER"]),
}).superRefine((body, ctx) => {
  if (body.isPlatformAdmin && body.confirmAction !== "PROMOTE_ADMIN") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmAction"],
      message: "confirmAction must be PROMOTE_ADMIN when granting admin",
    });
  }
  if (!body.isPlatformAdmin && body.confirmAction !== "DEMOTE_USER") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmAction"],
      message: "confirmAction must be DEMOTE_USER when removing admin",
    });
  }
});

export const NETWORK_TABLES = [
  "workspaces",
  "users",
  "assessments",
  "bookings",
  "sheetDownloads",
] as const;

export const networkTableParamsSchema = z.object({
  table: z.enum(NETWORK_TABLES),
});
