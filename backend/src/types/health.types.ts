import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type SystemHealthStatus = "ok" | "degraded" | "down";

export type SystemHealth = {
  status: SystemHealthStatus;
  uptimeSeconds: number;
  mongo: { readyState: number; label: string };
  timestamp: ISODateString;
};

export type ClientHealthOverview = {
  clientId: ID;
  score: number;
  level: string;
  trend: Trend;
  checkedAt: ISODateString;
};
