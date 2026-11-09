export const LEAD_SOURCES = [
  "WEBSITE",
  "REFERRAL",
  "ADS",
  "COLD_OUTREACH",
  "PARTNER",
  "EVENT",
  "OTHER",
] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];
