import { apiClient } from "@/lib/api/client";
import type { PaginationMeta } from "@/types/common";

import type {
  CreateCommunicationPayload,
  UpdateCommunicationPayload,
  Communication,
  CommunicationFilterState,
  CommunicationListItem,
  CommunicationStats,
} from "../types";

function buildQuery(
  filters: Partial<CommunicationFilterState>,
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

export async function listCommunication(
  filters: Partial<CommunicationFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ data: CommunicationListItem[]; meta: PaginationMeta }> {
  return apiClient(`/communication`, {
    method: "GET",
    query: buildQuery(filters, page, pageSize),
    signal,
  });
}

export async function getCommunication(
  id: string,
  signal?: AbortSignal,
): Promise<Communication> {
  return apiClient(`/communication/${id}`, { method: "GET", signal });
}

export async function createCommunication(
  payload: CreateCommunicationPayload,
): Promise<Communication> {
  return apiClient(`/communication`, { method: "POST", body: payload });
}

export async function updateCommunication(
  id: string,
  payload: UpdateCommunicationPayload,
): Promise<Communication> {
  return apiClient(`/communication/${id}`, { method: "PATCH", body: payload });
}

export async function deleteCommunication(id: string): Promise<void> {
  await apiClient(`/communication/${id}`, { method: "DELETE" });
}

export async function getCommunicationStats(
  signal?: AbortSignal,
): Promise<CommunicationStats> {
  return apiClient(`/communication/stats`, { method: "GET", signal });
}
