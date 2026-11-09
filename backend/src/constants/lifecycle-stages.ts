export const LIFECYCLE_STAGES = [
  "PROSPECT",
  "ONBOARDING",
  "ACTIVE",
  "EXPANSION",
  "AT_RISK",
  "CHURNED",
] as const;
export type LifecycleStageId = (typeof LIFECYCLE_STAGES)[number];
