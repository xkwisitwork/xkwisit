import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type AlertSeverity = "info" | "warning" | "critical";
export type AlertStatus = "OPEN" | "ACKNOWLEDGED" | "RESOLVED" | "MUTED";

export type Alert = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  title: string;
  message: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  triggeredAt: ISODateString;
  resolvedAt: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
