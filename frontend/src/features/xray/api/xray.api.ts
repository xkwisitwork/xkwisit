import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginationMeta } from "@/types/common";

import type {
  CreateXrayPayload,
  UpdateXrayPayload,
  Xray,
  XrayFilterState,
  XrayListItem,
  XrayStats,
} from "../types";

export type XraySignalLabel =
  | "Brand clarity"
  | "Demand quality"
  | "Sales follow-through"
  | "Retention loop";

export type XrayFindingSeverity = "ok" | "warn" | "fail";

export type XrayFinding = {
  id: string;
  label: string;
  detail: string;
  severity: XrayFindingSeverity;
  dimension: XraySignalLabel;
};

export type XraySignal = {
  label: XraySignalLabel;
  score: number;
};

export type XrayScanResult = {
  domain: string;
  finalUrl: string;
  overall: number;
  constraint: XraySignalLabel;
  signals: XraySignal[];
  findings: XrayFinding[];
  scannedAt: string;
  timingMs: number;
};

export async function runXrayScan(url: string): Promise<XrayScanResult> {
  return apiClient<XrayScanResult>(endpoints.xray.run, {
    method: "POST",
    body: { url },
  });
}

function buildQuery(
  filters: Partial<XrayFilterState>,
  page: number,
  pageSize: number,
): Record<string, string | number | boolean | null | undefined> {
  return {
    page,
    pageSize,
    search: filters.search,
    clientId: filters.clientId ?? undefined,
    status: filters.statuses?.length ? filters.statuses.join(",") : undefined,
  };
}

export async function listXray(
  filters: Partial<XrayFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ data: XrayListItem[]; meta: PaginationMeta }> {
  return apiClient(`/xray`, {
    method: "GET",
    query: buildQuery(filters, page, pageSize),
    signal,
  });
}

export async function getXray(id: string, signal?: AbortSignal): Promise<Xray> {
  return apiClient(`/xray/${id}`, { method: "GET", signal });
}

export async function createXray(payload: CreateXrayPayload): Promise<Xray> {
  return apiClient(`/xray`, { method: "POST", body: payload });
}

export async function updateXray(id: string, payload: UpdateXrayPayload): Promise<Xray> {
  return apiClient(`/xray/${id}`, { method: "PATCH", body: payload });
}

export async function deleteXray(id: string): Promise<void> {
  await apiClient(`/xray/${id}`, { method: "DELETE" });
}

export async function getXrayStats(signal?: AbortSignal): Promise<XrayStats> {
  return apiClient(`/xray/stats`, { method: "GET", signal });
}
