import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginationMeta } from "@/types/common";

import type {
  CreateOpportunityPayload,
  Opportunity,
  OpportunityFilterState,
  OpportunityListItem,
  OpportunityStats,
  UpdateOpportunityPayload,
} from "../types";

function emptyMeta(page: number, pageSize: number, total: number): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return {
    page,
    pageSize,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export async function listOpportunities(
  filters: Partial<OpportunityFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ items: OpportunityListItem[]; meta: PaginationMeta }> {
  try {
    const response = await apiClient<{
      data?: OpportunityListItem[];
      items?: OpportunityListItem[];
      meta: PaginationMeta;
    }>(endpoints.opportunities.list, {
      method: "GET",
      query: {
        page,
        pageSize,
        search: filters.search,
        stage: filters.stages?.join(","),
        ownerId: filters.ownerId ?? undefined,
      },
      signal,
    });
    return {
      items: response.items ?? response.data ?? [],
      meta: response.meta,
    };
  } catch {
    return { items: [], meta: emptyMeta(page, pageSize, 0) };
  }
}

export async function getOpportunity(
  id: string,
  signal?: AbortSignal,
): Promise<Opportunity> {
  return apiClient<Opportunity>(endpoints.opportunities.detail(id), {
    method: "GET",
    signal,
  });
}

export async function createOpportunity(
  payload: CreateOpportunityPayload,
): Promise<Opportunity> {
  return apiClient(endpoints.opportunities.create, {
    method: "POST",
    body: payload,
  });
}

export async function updateOpportunity(
  id: string,
  payload: UpdateOpportunityPayload,
): Promise<Opportunity> {
  return apiClient(endpoints.opportunities.update(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function getOpportunityStats(
  signal?: AbortSignal,
): Promise<OpportunityStats> {
  try {
    return await apiClient<OpportunityStats>(`${endpoints.opportunities.list}/stats`, {
      method: "GET",
      signal,
    });
  } catch {
    return {
      total: 0,
      open: 0,
      won: 0,
      lost: 0,
      totalValue: { amount: 0, currency: "NGN" },
      weightedValue: { amount: 0, currency: "NGN" },
    };
  }
}
