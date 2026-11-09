import type { OrgPlan, OrgStatus } from "../models/Organization.js";

/** Feature keys used to gate agency nav / modules. */
export const FEATURES = [
  "dashboard",
  "clients",
  "crm",
  "sales",
  "growth-assessment",
  "projects",
  "tasks",
  "approvals",
  "campaigns",
  "content",
  "brand",
  "analytics",
  "intelligence",
  "automation",
  "ai",
  "reports",
  "finance",
  "team",
  "services",
  "knowledge",
  "messaging",
  "settings",
] as const;

export type FeatureKey = (typeof FEATURES)[number];

const ALL = [...FEATURES] as FeatureKey[];

const STARTER: FeatureKey[] = [
  "dashboard",
  "clients",
  "crm",
  "sales",
  "projects",
  "tasks",
  "settings",
];

const GROWTH: FeatureKey[] = [
  ...STARTER,
  "growth-assessment",
  "approvals",
  "campaigns",
  "content",
  "brand",
  "reports",
  "messaging",
];

const SCALE: FeatureKey[] = [
  ...GROWTH,
  "analytics",
  "intelligence",
  "automation",
  "ai",
  "finance",
  "team",
  "services",
  "knowledge",
];

const ENTERPRISE: FeatureKey[] = ALL;

/** After trial expires without payment — keep core read/work + billing. */
const LOCKED: FeatureKey[] = ["dashboard", "settings", "clients", "crm"];

export const PLAN_FEATURES: Record<OrgPlan, FeatureKey[]> = {
  STARTER,
  GROWTH,
  SCALE,
  ENTERPRISE,
};

export type BillingSnapshot = {
  plan: OrgPlan;
  status: OrgStatus;
  trialStartsAt: string | null;
  trialEndsAt: string | null;
  trialDaysRemaining: number | null;
  trialActive: boolean;
  seatsIncluded: number;
  entitlements: FeatureKey[];
  isLocked: boolean;
};

export function resolveEntitlements(input: {
  plan: OrgPlan;
  status: OrgStatus;
  trialEndsAt?: Date | null;
}): { entitlements: FeatureKey[]; trialActive: boolean; isLocked: boolean; trialDaysRemaining: number | null } {
  const now = Date.now();
  const trialEnd = input.trialEndsAt ? input.trialEndsAt.getTime() : null;
  const trialActive =
    input.status === "TRIAL" && trialEnd != null && trialEnd > now;

  if (input.status === "SUSPENDED" || input.status === "CANCELLED") {
    return {
      entitlements: ["dashboard", "settings"],
      trialActive: false,
      isLocked: true,
      trialDaysRemaining: 0,
    };
  }

  if (trialActive) {
    const days = trialEnd
      ? Math.max(0, Math.ceil((trialEnd - now) / (24 * 60 * 60 * 1000)))
      : null;
    return {
      entitlements: ALL,
      trialActive: true,
      isLocked: false,
      trialDaysRemaining: days,
    };
  }

  // Trial ended, never converted
  if (input.status === "TRIAL" && trialEnd != null && trialEnd <= now) {
    return {
      entitlements: LOCKED,
      trialActive: false,
      isLocked: true,
      trialDaysRemaining: 0,
    };
  }

  if (input.status === "PAST_DUE") {
    return {
      entitlements: LOCKED,
      trialActive: false,
      isLocked: true,
      trialDaysRemaining: null,
    };
  }

  // ACTIVE (paid)
  return {
    entitlements: PLAN_FEATURES[input.plan] ?? STARTER,
    trialActive: false,
    isLocked: false,
    trialDaysRemaining: null,
  };
}

export function toBillingSnapshot(org: {
  plan: OrgPlan;
  status: OrgStatus;
  trialStartsAt?: Date | null;
  trialEndsAt?: Date | null;
  seatsIncluded?: number;
}): BillingSnapshot {
  const resolved = resolveEntitlements({
    plan: org.plan,
    status: org.status,
    trialEndsAt: org.trialEndsAt,
  });

  return {
    plan: org.plan,
    status: org.status,
    trialStartsAt: org.trialStartsAt?.toISOString?.() ?? null,
    trialEndsAt: org.trialEndsAt?.toISOString?.() ?? null,
    trialDaysRemaining: resolved.trialDaysRemaining,
    trialActive: resolved.trialActive,
    seatsIncluded: org.seatsIncluded ?? 5,
    entitlements: resolved.entitlements,
    isLocked: resolved.isLocked,
  };
}
