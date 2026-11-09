import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type MetricKind = "COUNTER" | "GAUGE" | "RATIO" | "CURRENCY" | "DURATION";

export type MetricPoint = {
  at: ISODateString;
  value: number;
};

export type MetricSeries = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  key: string;
  label: string;
  kind: MetricKind;
  unit: string | null;
  points: MetricPoint[];
  trend: Trend | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type MetricSnapshot = {
  key: string;
  label: string;
  value: number;
  previousValue: number | null;
  deltaPercent: number | null;
  trend: Trend;
};
