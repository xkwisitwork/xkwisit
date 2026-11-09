import type { ID, ISODateString } from "./common.types.js";

/**
 * Reporting domain types.
 */

export type ReportStatus =
  | "DRAFT"
  | "GENERATING"
  | "READY"
  | "SHARED"
  | "ARCHIVED"
  | "FAILED";

export type ReportType =
  | "GROWTH"
  | "CAMPAIGN"
  | "CLIENT_HEALTH"
  | "ASSESSMENT"
  | "CUSTOM";

export type Report = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  type: ReportType;
  status: ReportStatus;
  description: string | null;
  periodStart: ISODateString | null;
  periodEnd: ISODateString | null;
  generatedAt: ISODateString | null;
  sharedAt: ISODateString | null;
  createdById: ID | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ReportListItem = Pick<
  Report,
  | "id"
  | "name"
  | "type"
  | "status"
  | "clientId"
  | "periodStart"
  | "periodEnd"
  | "generatedAt"
  | "createdAt"
  | "updatedAt"
>;

export type CreateReportPayload = {
  name: string;
  type: ReportType;
  clientId?: ID | null;
  description?: string | null;
  periodStart?: ISODateString | null;
  periodEnd?: ISODateString | null;
  metadata?: Record<string, unknown>;
};

export type UpdateReportPayload = Partial<CreateReportPayload> & {
  status?: ReportStatus;
};
