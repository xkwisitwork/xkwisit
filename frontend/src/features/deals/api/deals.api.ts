import { apiClient } from "@/lib/api/client";
import type { PaginationMeta } from "@/types/common";

import type {
  CreateDealsPayload,
  UpdateDealsPayload,
  Deals,
  DealsFilterState,
  DealsListItem,
  DealsStats,
} from "../types";

function buildQuery(
  filters: Partial<DealsFilterState>,
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

export async function listDeals(
  filters: Partial<DealsFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ data: DealsListItem[]; meta: PaginationMeta }> {
  return apiClient(`/deals`, {
    method: "GET",
    query: buildQuery(filters, page, pageSize),
    signal,
  });
}

export async function getDeals(id: string, signal?: AbortSignal): Promise<Deals> {
  return apiClient(`/deals/${id}`, { method: "GET", signal });
}

export async function createDeals(payload: CreateDealsPayload): Promise<Deals> {
  return apiClient(`/deals`, { method: "POST", body: payload });
}

export async function updateDeals(
  id: string,
  payload: UpdateDealsPayload,
): Promise<Deals> {
  return apiClient(`/deals/${id}`, { method: "PATCH", body: payload });
}

export async function deleteDeals(id: string): Promise<void> {
  await apiClient(`/deals/${id}`, { method: "DELETE" });
}

export async function getDealsStats(signal?: AbortSignal): Promise<DealsStats> {
  return apiClient(`/deals/stats`, { method: "GET", signal });
}
