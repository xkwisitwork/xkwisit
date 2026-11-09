import { apiClient } from "@/lib/api/client";
import type { PaginationMeta } from "@/types/common";

import type {
  CreatePaymentsPayload,
  UpdatePaymentsPayload,
  Payments,
  PaymentsFilterState,
  PaymentsListItem,
  PaymentsStats,
} from "../types";

function buildQuery(
  filters: Partial<PaymentsFilterState>,
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

export async function listPayments(
  filters: Partial<PaymentsFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ data: PaymentsListItem[]; meta: PaginationMeta }> {
  return apiClient(`/payments`, {
    method: "GET",
    query: buildQuery(filters, page, pageSize),
    signal,
  });
}

export async function getPayments(id: string, signal?: AbortSignal): Promise<Payments> {
  return apiClient(`/payments/${id}`, { method: "GET", signal });
}

export async function createPayments(payload: CreatePaymentsPayload): Promise<Payments> {
  return apiClient(`/payments`, { method: "POST", body: payload });
}

export async function updatePayments(
  id: string,
  payload: UpdatePaymentsPayload,
): Promise<Payments> {
  return apiClient(`/payments/${id}`, { method: "PATCH", body: payload });
}

export async function deletePayments(id: string): Promise<void> {
  await apiClient(`/payments/${id}`, { method: "DELETE" });
}

export async function getPaymentsStats(signal?: AbortSignal): Promise<PaymentsStats> {
  return apiClient(`/payments/stats`, { method: "GET", signal });
}
