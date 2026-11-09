import type { ID, ISODateString, Trend } from "./common.types.js";

/**
 * Growth intelligence domain types (anomaly, recommendations, health, etc.).
 */

export type IntelligenceSeverity = "info" | "low" | "medium" | "high" | "critical";

export type IntelligenceStatus =
  | "OPEN"
  | "ACKNOWLEDGED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "DISMISSED"
  | "ARCHIVED";

export type IntelligenceSignalType =
  | "ANOMALY"
  | "BOTTLENECK"
  | "RECOMMENDATION"
  | "REVENUE_LEAK"
  | "HEALTH"
  | "WHY_DID"
  | "EXPERIMENT"
  | "AUTOPILOT";

export type IntelligenceSignal = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  type: IntelligenceSignalType;
  title: string;
  summary: string;
  severity: IntelligenceSeverity;
  status: IntelligenceStatus;
  score: number | null;
  trend: Trend | null;
  detectedAt: ISODateString;
  resolvedAt: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type IntelligenceListItem = Pick<
  IntelligenceSignal,
  | "id"
  | "type"
  | "title"
  | "severity"
  | "status"
  | "score"
  | "clientId"
  | "detectedAt"
  | "createdAt"
>;

export type AnomalySignal = IntelligenceSignal & {
  type: "ANOMALY";
  baseline: number | null;
  observed: number | null;
  metricKey: string;
};

export type RecommendationSignal = IntelligenceSignal & {
  type: "RECOMMENDATION";
  actionLabel: string | null;
  estimatedImpact: string | null;
};

export type CreateIntelligencePayload = {
  type: IntelligenceSignalType;
  title: string;
  summary: string;
  severity?: IntelligenceSeverity;
  clientId?: ID | null;
  score?: number | null;
  metadata?: Record<string, unknown>;
};

export type UpdateIntelligencePayload = {
  status?: IntelligenceStatus;
  summary?: string;
  severity?: IntelligenceSeverity;
  metadata?: Record<string, unknown>;
};
