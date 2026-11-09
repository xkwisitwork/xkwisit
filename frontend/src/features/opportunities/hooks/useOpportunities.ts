"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  getOpportunity,
  getOpportunityStats,
  listOpportunities,
} from "../api/opportunities.api";
import { opportunityKeys } from "../api/queryKeys";
import type { OpportunityFilterState } from "../types";

export type UseOpportunitiesOptions = {
  filters?: Partial<OpportunityFilterState>;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
};

export function useOpportunities({
  filters = {},
  page = 1,
  pageSize = 20,
  enabled = true,
}: UseOpportunitiesOptions = {}) {
  return useQuery({
    queryKey: opportunityKeys.list(filters, page, pageSize),
    queryFn: ({ signal }) => listOpportunities(filters, page, pageSize, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useOpportunity(id: string, enabled = true) {
  return useQuery({
    queryKey: opportunityKeys.detail(id),
    queryFn: ({ signal }) => getOpportunity(id, signal),
    enabled: enabled && Boolean(id),
    staleTime: 30_000,
  });
}

export function useOpportunityStats(enabled = true) {
  return useQuery({
    queryKey: opportunityKeys.stats(),
    queryFn: ({ signal }) => getOpportunityStats(signal),
    enabled,
    staleTime: 30_000,
  });
}
