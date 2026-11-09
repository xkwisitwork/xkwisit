import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type ExperimentStatus = "DRAFT" | "RUNNING" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type ExperimentType = "AB" | "MULTIVARIATE" | "SPLIT_URL";

/* ─── Overview ───────────────────────────────────────── */

export type WebsiteOverview = {
  clientId: ID;
  clientName: string;
  domain: string;
  sessions: number;
  users: number;
  bounceRate: number;
  conversionRate: number;
  avgSessionDurationSec: number;
  topPages: PagePerformanceRow[];
};

export type PagePerformanceRow = {
  id: ID;
  path: string;
  title: string | null;
  sessions: number;
  bounceRate: number;
  conversionRate: number;
  avgDurationSec: number;
};

export type FunnelStep = {
  id: string;
  label: string;
  count: number;
  dropOffRate: number | null;
};

export type WebsitePerformance = {
  clientId: ID;
  periodLabel: string;
  sessions: number;
  conversions: number;
  revenue: number;
  funnel: FunnelStep[];
  pages: PagePerformanceRow[];
};

/* ─── Experiments ────────────────────────────────────── */

export type ExperimentVariant = {
  id: ID;
  name: string;
  isControl: boolean;
  visitors: number;
  conversions: number;
  conversionRate: number;
};

export type Experiment = {
  id: ID;
  clientId: ID;
  clientName: string;
  name: string;
  hypothesis: string | null;
  type: ExperimentType;
  status: ExperimentStatus;
  primaryMetric: string;
  startDate: ISODateString | null;
  endDate: ISODateString | null;
  variants: ExperimentVariant[];
  winnerVariantId: ID | null;
  confidence: number | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ExperimentListItem = Pick<
  Experiment,
  | "id"
  | "name"
  | "type"
  | "status"
  | "primaryMetric"
  | "startDate"
  | "endDate"
  | "confidence"
  | "clientName"
>;

/* ─── Payloads ───────────────────────────────────────── */

export type CreateExperimentPayload = {
  clientId: string;
  name: string;
  hypothesis?: string;
  type: ExperimentType;
  primaryMetric: string;
  startDate?: string;
  endDate?: string;
  variants: Array<{ name: string; isControl?: boolean }>;
};

export type UpdateExperimentPayload = Partial<
  Omit<CreateExperimentPayload, "clientId" | "variants">
> & {
  status?: ExperimentStatus;
  winnerVariantId?: string;
  confidence?: number;
};
