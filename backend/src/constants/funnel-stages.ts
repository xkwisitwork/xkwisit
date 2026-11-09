export const FUNNEL_STAGES = [
  "VISITOR",
  "LEAD",
  "MQL",
  "SQL",
  "OPPORTUNITY",
  "CUSTOMER",
] as const;
export type FunnelStageId = (typeof FUNNEL_STAGES)[number];
