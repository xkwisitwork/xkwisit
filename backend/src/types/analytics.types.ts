import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type AnalyticsEvent = {
  id: ID;
  organizationId: ID | null;
  clientId: ID | null;
  name: string;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  path: string | null;
  properties: Record<string, unknown>;
  occurredAt: ISODateString;
  createdAt: ISODateString;
};

export type AnalyticsSummary = {
  sessions: number;
  users: number;
  conversions: number;
  revenue: number;
  periodStart: ISODateString;
  periodEnd: ISODateString;
};
