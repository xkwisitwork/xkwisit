import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginationMeta } from "@/types/common";

import type {
  AttributionRow,
  Campaign,
  CampaignFilters,
  CampaignListItem,
  CampaignMetrics,
  CampaignStats,
  ChannelBreakdownRow,
  CreateCampaignPayload,
  UpdateCampaignPayload,
} from "../types";

function buildQuery(
  filters: Partial<CampaignFilters>,
  page?: number,
  pageSize?: number,
): Record<string, string | number | undefined> {
  const query: Record<string, string | number | undefined> = {};

  if (page !== undefined) query.page = page;
  if (pageSize !== undefined) query.pageSize = pageSize;
  if (filters.search) query.search = filters.search;
  if (filters.statuses?.length) query.status = filters.statuses.join(",");
  if (filters.channels?.length) query.channel = filters.channels.join(",");
  if (filters.objectives?.length) query.objective = filters.objectives.join(",");
  if (filters.clientId) query.clientId = filters.clientId;

  return query;
}

/* ─── List ───────────────────────────────────────────── */

export async function listCampaigns(
  filters: Partial<CampaignFilters> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ items: CampaignListItem[]; meta: PaginationMeta }> {
  const response = await apiClient<{
    data: CampaignListItem[];
    meta: PaginationMeta;
  }>(endpoints.campaigns.list, {
    method: "GET",
    query: buildQuery(filters, page, pageSize),
    signal,
  });

  return {
    items: response?.data ?? [],
    meta: response?.meta ?? {
      page: 1,
      pageSize: 20,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  };
}

/* ─── Detail ─────────────────────────────────────────── */

export async function getCampaign(id: string, signal?: AbortSignal): Promise<Campaign> {
  return apiClient<Campaign>(endpoints.campaigns.detail(id), {
    method: "GET",
    signal,
  });
}

export async function getCampaignPerformance(
  id: string,
  signal?: AbortSignal,
): Promise<CampaignMetrics> {
  return apiClient<CampaignMetrics>(endpoints.campaigns.performance(id), {
    method: "GET",
    signal,
  });
}

/* ─── Attribution / channels / calendar ──────────────── */

export async function listAttribution(
  filters: Partial<CampaignFilters> = {},
  signal?: AbortSignal,
): Promise<AttributionRow[]> {
  return apiClient<AttributionRow[]>(endpoints.campaigns.attribution, {
    method: "GET",
    query: buildQuery(filters),
    signal,
  });
}

export async function listChannelBreakdown(
  filters: Partial<CampaignFilters> = {},
  signal?: AbortSignal,
): Promise<ChannelBreakdownRow[]> {
  return apiClient<ChannelBreakdownRow[]>(endpoints.campaigns.channels, {
    method: "GET",
    query: buildQuery(filters),
    signal,
  });
}

export async function listCampaignCalendar(
  filters: Partial<CampaignFilters> = {},
  signal?: AbortSignal,
): Promise<CampaignListItem[]> {
  return apiClient<CampaignListItem[]>(endpoints.campaigns.calendar, {
    method: "GET",
    query: buildQuery(filters),
    signal,
  });
}

/* ─── Mutations ──────────────────────────────────────── */

export async function createCampaign(payload: CreateCampaignPayload): Promise<Campaign> {
  return apiClient<Campaign>(endpoints.campaigns.create, {
    method: "POST",
    body: payload,
  });
}

export async function updateCampaign(
  id: string,
  payload: UpdateCampaignPayload,
): Promise<Campaign> {
  return apiClient<Campaign>(endpoints.campaigns.update(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function pauseCampaign(id: string): Promise<Campaign> {
  return apiClient<Campaign>(endpoints.campaigns.pause(id), { method: "POST" });
}

export async function resumeCampaign(id: string): Promise<Campaign> {
  return apiClient<Campaign>(endpoints.campaigns.resume(id), { method: "POST" });
}

export async function deleteCampaign(id: string): Promise<void> {
  return apiClient<void>(endpoints.campaigns.detail(id), { method: "DELETE" });
}

/* ─── Stats ──────────────────────────────────────────── */

export async function getCampaignStats(signal?: AbortSignal): Promise<CampaignStats> {
  return apiClient<CampaignStats>(`${endpoints.campaigns.list}/stats`, {
    method: "GET",
    signal,
  });
}
