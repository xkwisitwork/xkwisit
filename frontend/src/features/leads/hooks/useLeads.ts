"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { listLeads } from "../api/leads.api";
import { leadKeys } from "../api/queryKeys";
import type { LeadFilterState } from "../types";

export type UseLeadsOptions = {
  filters?: Partial<LeadFilterState>;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
};

export function useLeads({
  filters = {},
  page = 1,
  pageSize = 20,
  enabled = true,
}: UseLeadsOptions = {}) {
  return useQuery({
    queryKey: leadKeys.list(filters, page, pageSize),
    queryFn: ({ signal }) => listLeads(filters, page, pageSize, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
