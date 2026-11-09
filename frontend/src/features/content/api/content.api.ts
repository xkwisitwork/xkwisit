import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginationMeta } from "@/types/common";

import type {
  CalendarEntry,
  ContentFilters,
  ContentItem,
  ContentListItem,
  ContentPerformance,
  ContentStats,
  CreateContentPayload,
  PipelineColumn,
  UpdateContentPayload,
} from "../types";

export type ContentApprovalAction = {
  comment?: string;
};

function buildQuery(
  filters: Partial<ContentFilters>,
  page?: number,
  pageSize?: number,
): Record<string, string | number | undefined> {
  const query: Record<string, string | number | undefined> = {};

  if (page !== undefined) query.page = page;
  if (pageSize !== undefined) query.pageSize = pageSize;
  if (filters.search) query.search = filters.search;
  if (filters.statuses?.length) query.status = filters.statuses.join(",");
  if (filters.types?.length) query.type = filters.types.join(",");
  if (filters.platforms?.length) query.platform = filters.platforms.join(",");
  if (filters.objectives?.length) query.objective = filters.objectives.join(",");
  if (filters.clientId) query.clientId = filters.clientId;
  if (filters.campaignId) query.campaignId = filters.campaignId;
  if (filters.ownerId) query.ownerId = filters.ownerId;
  if (filters.fromDate) query.fromDate = filters.fromDate;
  if (filters.toDate) query.toDate = filters.toDate;

  return query;
}

export async function listContent(
  filters: Partial<ContentFilters> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ items: ContentListItem[]; meta: PaginationMeta }> {
  const response = await apiClient<{
    data: ContentListItem[];
    meta: PaginationMeta;
  }>(endpoints.content.list, {
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

export async function getContent(id: string, signal?: AbortSignal): Promise<ContentItem> {
  return apiClient<ContentItem>(endpoints.content.detail(id), {
    method: "GET",
    signal,
  });
}

export async function listContentCalendar(
  filters: Partial<ContentFilters> = {},
  signal?: AbortSignal,
): Promise<CalendarEntry[]> {
  return apiClient<CalendarEntry[]>(endpoints.content.calendar, {
    method: "GET",
    query: buildQuery(filters),
    signal,
  });
}

export async function listContentPipeline(
  filters: Partial<ContentFilters> = {},
  signal?: AbortSignal,
): Promise<PipelineColumn[]> {
  return apiClient<PipelineColumn[]>(endpoints.content.pipeline, {
    method: "GET",
    query: buildQuery(filters),
    signal,
  });
}

export async function listContentLibrary(
  filters: Partial<ContentFilters> = {},
  signal?: AbortSignal,
): Promise<ContentListItem[]> {
  return apiClient<ContentListItem[]>(endpoints.content.library, {
    method: "GET",
    query: buildQuery(filters),
    signal,
  });
}

export async function getContentPerformance(
  filters: Partial<ContentFilters> = {},
  signal?: AbortSignal,
): Promise<ContentPerformance> {
  return apiClient<ContentPerformance>(endpoints.content.performance, {
    method: "GET",
    query: buildQuery(filters),
    signal,
  });
}

export async function createContent(payload: CreateContentPayload): Promise<ContentItem> {
  return apiClient<ContentItem>(endpoints.content.create, {
    method: "POST",
    body: payload,
  });
}

export async function updateContent(
  id: string,
  payload: UpdateContentPayload,
): Promise<ContentItem> {
  return apiClient<ContentItem>(endpoints.content.update(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function approveContent(
  id: string,
  payload: ContentApprovalAction = {},
): Promise<ContentItem> {
  return apiClient<ContentItem>(endpoints.content.approve(id), {
    method: "POST",
    body: payload,
  });
}

export async function requestContentChanges(
  id: string,
  payload: ContentApprovalAction,
): Promise<ContentItem> {
  return apiClient<ContentItem>(endpoints.content.requestChanges(id), {
    method: "POST",
    body: payload,
  });
}

export async function deleteContent(id: string): Promise<void> {
  return apiClient<void>(endpoints.content.detail(id), { method: "DELETE" });
}

export async function getContentStats(signal?: AbortSignal): Promise<ContentStats> {
  return apiClient<ContentStats>(`${endpoints.content.list}/stats`, {
    method: "GET",
    signal,
  });
}
