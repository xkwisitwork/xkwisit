"use client";

import { useQuery } from "@tanstack/react-query";

import { listAttribution, listChannelBreakdown } from "../api/campaigns.api";
import { campaignKeys } from "../api/queryKeys";
import type { CampaignFilters } from "../types";

export function useAttribution(filters: Partial<CampaignFilters> = {}, enabled = true) {
  return useQuery({
    queryKey: campaignKeys.attribution(filters),
    queryFn: ({ signal }) => listAttribution(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useChannelBreakdown(
  filters: Partial<CampaignFilters> = {},
  enabled = true,
) {
  return useQuery({
    queryKey: campaignKeys.channels(filters),
    queryFn: ({ signal }) => listChannelBreakdown(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}
