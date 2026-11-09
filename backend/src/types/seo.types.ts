import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type SeoIssueSeverity = "info" | "warn" | "critical";

export type SeoAudit = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  url: string;
  score: number | null;
  issues: Array<{ code: string; severity: SeoIssueSeverity; message: string }>;
  scannedAt: ISODateString;
  createdAt: ISODateString;
};
