import type { ID, ISODateString } from "./common";

/**
 * Report domain types.
 */

export type ReportStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Report = {
  id: ID;
  organizationId: ID;
  name: string;
  status: ReportStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ReportListItem = Pick<
  Report,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type ReportFilterState = {
  search: string;
  statuses: ReportStatus[];
};

export const emptyReportFilters: ReportFilterState = {
  search: "",
  statuses: [],
};

export type CreateReportPayload = {
  name: string;
  description?: string | null;
  status?: ReportStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateReportPayload = Partial<CreateReportPayload>;
