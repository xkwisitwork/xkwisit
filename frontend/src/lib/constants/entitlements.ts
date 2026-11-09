/**
 * Plan entitlements - mirrors backend/src/config/entitlements.ts
 */

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

export type OrganizationPlan = "STARTER" | "GROWTH" | "SCALE" | "ENTERPRISE";
export type SubscriptionStatus =
  "TRIAL" | "ACTIVE" | "PAST_DUE" | "SUSPENDED" | "CANCELLED";

export type BillingSnapshot = {
  plan: OrganizationPlan;
  status: SubscriptionStatus;
  trialStartsAt: string | null;
  trialEndsAt: string | null;
  trialDaysRemaining: number | null;
  trialActive: boolean;
  seatsIncluded: number;
  entitlements: FeatureKey[];
  isLocked: boolean;
};

/** Map app nav section / item ids → feature keys */
export const NAV_FEATURE_MAP: Record<string, FeatureKey | "always" | "platform"> = {
  primary: "always",
  dashboard: "always",
  "command-center": "dashboard",
  "executive-brief": "dashboard",
  clients: "clients",
  "clients-list": "clients",
  portfolio: "clients",
  "portfolio-expansion": "clients",
  sales: "always",
  crm: "crm",
  leads: "crm",
  pipeline: "crm",
  opportunities: "crm",
  contacts: "crm",
  companies: "crm",
  activities: "crm",
  "follow-ups": "crm",
  scoring: "crm",
  sources: "crm",
  "sales-workspace": "sales",
  proposals: "sales",
  contracts: "sales",
  deals: "sales",
  documents: "sales",
  "growth-assessment": "growth-assessment",
  delivery: "always",
  projects: "projects",
  "projects-board": "projects",
  "projects-timeline": "projects",
  milestones: "projects",
  deliverables: "projects",
  tasks: "tasks",
  "my-tasks": "tasks",
  "tasks-board": "tasks",
  approvals: "approvals",
  "approvals-pending": "approvals",
  "approvals-history": "approvals",
  campaigns: "campaigns",
  "campaigns-calendar": "campaigns",
  "campaigns-channels": "campaigns",
  "campaigns-attribution": "campaigns",
  content: "content",
  "content-calendar": "content",
  "content-pipeline": "content",
  "content-library": "content",
  brand: "brand",
  "brand-assets": "brand",
  "brand-guidelines": "brand",
  intelligence: "always",
  analytics: "analytics",
  "analytics-events": "analytics",
  "analytics-utm": "analytics",
  "analytics-sources": "analytics",
  "analytics-warehouse": "analytics",
  "analytics-explorer": "analytics",
  "intelligence-hub": "intelligence",
  anomalies: "intelligence",
  bottlenecks: "intelligence",
  "why-did": "intelligence",
  "next-actions": "intelligence",
  experiments: "intelligence",
  autopilot: "intelligence",
  automation: "automation",
  ai: "ai",
  "ai-assistants": "ai",
  operations: "intelligence",
  reports: "reports",
  finance: "finance",
  team: "team",
  services: "services",
  knowledge: "knowledge",
  messaging: "messaging",
  account: "always",
  notifications: "always",
  settings: "always",
  "settings-profile": "settings",
  "settings-org": "settings",
  "settings-billing": "settings",
  help: "always",
  platform: "platform",
  "platform-workspaces": "platform",
  "platform-users": "platform",
  "platform-health": "platform",
  "platform-audit": "platform",
};

export function hasFeature(
  entitlements: FeatureKey[] | undefined,
  feature: FeatureKey | "always" | "platform",
  isPlatformAdmin = false,
): boolean {
  if (feature === "always") return true;
  if (feature === "platform") return isPlatformAdmin;
  // Platform owners are not plan-gated - full module access.
  if (isPlatformAdmin) return true;
  if (!entitlements?.length) return feature === "dashboard" || feature === "settings";
  return entitlements.includes(feature);
}
