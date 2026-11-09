import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  CreateReportPayload,
  DispatchReportPayload,
  GenerateReportPayload,
  Report,
  ReportListItem,
  ReportSchedule,
  ReportTemplate,
} from "../types";

export async function listReports(
  query?: { clientId?: string; status?: string },
  signal?: AbortSignal,
): Promise<ReportListItem[]> {
  return apiClient<ReportListItem[]>(endpoints.reports.list, {
    method: "GET",
    query,
    signal,
  });
}

export async function getReport(id: string, signal?: AbortSignal): Promise<Report> {
  return apiClient<Report>(endpoints.reports.detail(id), {
    method: "GET",
    signal,
  });
}

export async function createReport(payload: CreateReportPayload): Promise<Report> {
  return apiClient<Report>(endpoints.reports.create, {
    method: "POST",
    body: payload,
  });
}

export async function generateReport(payload: GenerateReportPayload): Promise<Report> {
  return apiClient<Report>(endpoints.reports.generate, {
    method: "POST",
    body: payload,
  });
}

export async function listReportTemplates(
  signal?: AbortSignal,
): Promise<ReportTemplate[]> {
  return apiClient<ReportTemplate[]>(endpoints.reports.templates, {
    method: "GET",
    signal,
  });
}

export async function listScheduledReports(
  signal?: AbortSignal,
): Promise<ReportSchedule[]> {
  return apiClient<ReportSchedule[]>(endpoints.reports.scheduled, {
    method: "GET",
    signal,
  });
}

export async function dispatchReport(
  id: string,
  payload: DispatchReportPayload,
): Promise<Report> {
  return apiClient<Report>(endpoints.reports.dispatch(id), {
    method: "POST",
    body: payload,
  });
}
