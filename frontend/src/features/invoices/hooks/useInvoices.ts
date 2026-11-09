"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getInvoice, getInvoiceStats, listInvoices } from "../api/invoices.api";
import { invoiceKeys } from "../api/queryKeys";
import type { InvoiceFilterState } from "../types";

export type UseInvoicesOptions = {
  filters?: Partial<InvoiceFilterState>;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
};

export function useInvoices({
  filters = {},
  page = 1,
  pageSize = 20,
  enabled = true,
}: UseInvoicesOptions = {}) {
  return useQuery({
    queryKey: invoiceKeys.list(filters, page, pageSize),
    queryFn: ({ signal }) => listInvoices(filters, page, pageSize, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useInvoice(id: string, enabled = true) {
  return useQuery({
    queryKey: invoiceKeys.detail(id),
    queryFn: ({ signal }) => getInvoice(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useInvoiceStats(enabled = true) {
  return useQuery({
    queryKey: invoiceKeys.stats(),
    queryFn: ({ signal }) => getInvoiceStats(signal),
    enabled,
    staleTime: 60_000,
  });
}
