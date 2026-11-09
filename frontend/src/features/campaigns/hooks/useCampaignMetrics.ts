"use client";

import { useQuery } from "@tanstack/react-query";

import { getCampaignPerformance } from "../api/campaigns.api";
import { campaignKeys } from "../api/queryKeys";

export function useCampaignMetrics(id: string, enabled = true) {
  return useQuery({
    queryKey: campaignKeys.performance(id),
    queryFn: ({ signal }) => getCampaignPerformance(id, signal),
    enabled: enabled && Boolean(id),
    staleTime: 30_000,
  });
}
