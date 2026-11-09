import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type AnomalySeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type AnomalyStatus = "OPEN" | "ACKNOWLEDGED" | "RESOLVED" | "DISMISSED";

export type BottleneckSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type ActionPriority = "P0" | "P1" | "P2" | "P3";

export type HealthDimensionKey =
  "ACQUISITION" | "ACTIVATION" | "RETENTION" | "REVENUE" | "REFERRAL" | "OPS";

/* ─── Anomalies ──────────────────────────────────────── */

export type Anomaly = {
  id: ID;
  clientId: ID | null;
  clientName: string | null;
  title: string;
  metric: string;
  severity: AnomalySeverity;
  status: AnomalyStatus;
  deltaPercent: number;
  detectedAt: ISODateString;
  summary: string | null;
};

export type AnomalyListItem = Pick<
  Anomaly,
  | "id"
  | "title"
  | "metric"
  | "severity"
  | "status"
  | "deltaPercent"
  | "detectedAt"
  | "clientName"
>;

/* ─── Bottlenecks ────────────────────────────────────── */

export type Bottleneck = {
  id: ID;
  clientId: ID | null;
  clientName: string | null;
  stage: string;
  title: string;
  severity: BottleneckSeverity;
  impactScore: number;
  detectedAt: ISODateString;
  evidence: string[];
};

/* ─── Health ─────────────────────────────────────────── */

export type HealthDimension = {
  key: HealthDimensionKey;
  label: string;
  score: number;
  weight: number;
};

export type ClientHealthSnapshot = {
  clientId: ID;
  clientName: string;
  score: number;
  label: string;
  dimensions: HealthDimension[];
  updatedAt: ISODateString;
};

export type HealthTrendPoint = {
  date: ISODateString;
  score: number;
};

/* ─── Recommendations ────────────────────────────────── */

export type RecommendedAction = {
  id: ID;
  clientId: ID | null;
  clientName: string | null;
  title: string;
  reason: string;
  priority: ActionPriority;
  estimatedImpact: string | null;
  createdAt: ISODateString;
};

/* ─── Revenue leak ───────────────────────────────────── */

export type RevenueLeak = {
  id: ID;
  clientId: ID | null;
  clientName: string | null;
  stage: string;
  title: string;
  estimatedMonthlyLoss: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  evidence: string[];
  detectedAt: ISODateString;
};

/* ─── Growth overview ────────────────────────────────── */

export type GrowthOverview = {
  clientId: ID;
  clientName: string;
  healthScore: number;
  openAnomalies: number;
  openBottlenecks: number;
  openLeaks: number;
  pendingActions: number;
};

/* ─── Why did ────────────────────────────────────────── */

export type WhyDidQueryPayload = {
  clientId?: string;
  metric: string;
  periodLabel?: string;
  question?: string;
};

export type ContributingFactor = {
  id: ID;
  label: string;
  impactPercent: number;
  direction: "up" | "down" | "flat";
  evidence: string | null;
};

export type WhyDidResult = {
  id: ID;
  metric: string;
  periodLabel: string;
  summary: string;
  deltaPercent: number;
  factors: ContributingFactor[];
  generatedAt: ISODateString;
};

/* ─── Experiments registry ───────────────────────────── */

export type IntelExperimentStatus = "HYPOTHESIS" | "RUNNING" | "DECIDED" | "ARCHIVED";

export type IntelExperiment = {
  id: ID;
  clientId: ID | null;
  clientName: string | null;
  name: string;
  hypothesis: string;
  status: IntelExperimentStatus;
  primaryMetric: string;
  resultSummary: string | null;
  decision: "SHIP" | "ITERATE" | "KILL" | null;
  confidence: number | null;
  startedAt: ISODateString | null;
  decidedAt: ISODateString | null;
};

export type IntelExperimentListItem = Pick<
  IntelExperiment,
  | "id"
  | "name"
  | "status"
  | "primaryMetric"
  | "decision"
  | "confidence"
  | "clientName"
  | "startedAt"
>;

/* ─── Autopilot ──────────────────────────────────────── */

export type AutopilotRuleStatus = "ACTIVE" | "PAUSED" | "REVIEW";

export type AutopilotRule = {
  id: ID;
  name: string;
  description: string | null;
  status: AutopilotRuleStatus;
  triggerLabel: string;
  actionLabel: string;
  lastFiredAt: ISODateString | null;
};

export type AutopilotEvent = {
  id: ID;
  ruleId: ID;
  ruleName: string;
  summary: string;
  needsReview: boolean;
  createdAt: ISODateString;
};
