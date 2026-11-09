import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type ReportStatus = "DRAFT" | "READY" | "SCHEDULED" | "SENT" | "ARCHIVED";

export type ReportPeriod = "WEEKLY" | "MONTHLY" | "QUARTERLY" | "CUSTOM";

/* ─── Core ───────────────────────────────────────────── */

export type Report = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  clientName: string | null;
  title: string;
  period: ReportPeriod;
  status: ReportStatus;
  templateId: string | null;
  executiveSummary: string | null;
  sections: ReportSection[];
  scheduledAt: ISODateString | null;
  sentAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ReportListItem = Pick<
  Report,
  | "id"
  | "title"
  | "period"
  | "status"
  | "clientName"
  | "scheduledAt"
  | "sentAt"
  | "updatedAt"
>;

export type ReportSection = {
  id: string;
  title: string;
  body: string;
  order: number;
};

export type ReportTemplate = {
  id: string;
  name: string;
  description: string;
  period: ReportPeriod;
  sectionTitles: string[];
};

export type ReportSchedule = {
  id: ID;
  reportId: ID | null;
  templateId: string;
  clientId: ID | null;
  clientName: string | null;
  cadence: ReportPeriod;
  nextRunAt: ISODateString;
  enabled: boolean;
};

export type ReportBranding = {
  logoUrl: string | null;
  primaryColor: string | null;
  footerText: string | null;
};

/* ─── Payloads ───────────────────────────────────────── */

export type CreateReportPayload = {
  title: string;
  clientId?: string;
  period: ReportPeriod;
  templateId?: string;
  executiveSummary?: string;
  sections?: Array<{ title: string; body: string }>;
};

export type GenerateReportPayload = {
  clientId: string;
  period: ReportPeriod;
  templateId?: string;
};

export type DispatchReportPayload = {
  recipients: string[];
  message?: string;
};
