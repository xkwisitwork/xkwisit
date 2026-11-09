import type { ID, ISODateString } from "./common";

/**
 * Metric domain types.
 */

export type MetricStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Metric = {
  id: ID;
  organizationId: ID;
  name: string;
  status: MetricStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type MetricListItem = Pick<
  Metric,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type MetricFilterState = {
  search: string;
  statuses: MetricStatus[];
};

export const emptyMetricFilters: MetricFilterState = {
  search: "",
  statuses: [],
};

export type CreateMetricPayload = {
  name: string;
  description?: string | null;
  status?: MetricStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateMetricPayload = Partial<CreateMetricPayload>;
