import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginationMeta } from "@/types/common";

import type {
  CreateInvoicePayload,
  Invoice,
  InvoiceFilterState,
  InvoiceListItem,
  InvoiceStats,
  UpdateInvoicePayload,
} from "../types";

function buildQuery(
  filters: Partial<InvoiceFilterState>,
  page?: number,
  pageSize?: number,
): Record<string, string | number | boolean | null | undefined> {
  return {
    page,
    pageSize,
    search: filters.search,
    clientId: filters.clientId ?? undefined,
    overdueOnly: filters.overdueOnly || undefined,
    status: filters.statuses?.length ? filters.statuses.join(",") : undefined,
    paymentStatus: filters.paymentStatuses?.length
      ? filters.paymentStatuses.join(",")
      : undefined,
  };
}

export async function listInvoices(
  filters: Partial<InvoiceFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ items: InvoiceListItem[]; meta: PaginationMeta }> {
  const response = await apiClient<{
    data: InvoiceListItem[];
    meta: PaginationMeta;
  }>(endpoints.invoices.list, {
    method: "GET",
    query: buildQuery(filters, page, pageSize),
    signal,
  });

  return {
    items: response?.data ?? [],
    meta: response?.meta ?? {
      page,
      pageSize,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  };
}

export async function getInvoice(id: string, signal?: AbortSignal): Promise<Invoice> {
  return apiClient(endpoints.invoices.detail(id), { method: "GET", signal });
}

export async function createInvoice(payload: CreateInvoicePayload): Promise<Invoice> {
  return apiClient(endpoints.invoices.create, {
    method: "POST",
    body: payload,
  });
}

export async function updateInvoice(
  id: string,
  payload: UpdateInvoicePayload,
): Promise<Invoice> {
  return apiClient(endpoints.invoices.update(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function sendInvoice(id: string): Promise<Invoice> {
  return apiClient(endpoints.invoices.send(id), { method: "POST", body: {} });
}

export async function voidInvoice(id: string): Promise<Invoice> {
  return apiClient(endpoints.invoices.void(id), { method: "POST", body: {} });
}

export async function getInvoiceStats(signal?: AbortSignal): Promise<InvoiceStats> {
  return apiClient(`${endpoints.invoices.list}/stats`, {
    method: "GET",
    signal,
  });
}
