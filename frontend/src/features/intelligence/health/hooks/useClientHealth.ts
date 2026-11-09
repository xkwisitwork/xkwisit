"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getClientHealth,
  getGrowthOverview,
  getHealthTrend,
} from "../../api/intelligence.api";
import { intelligenceKeys } from "../../api/queryKeys";

export function useClientHealth(clientId: string, enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.health(clientId),
    queryFn: ({ signal }) => getClientHealth(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useHealthTrend(clientId: string, enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.healthTrend(clientId),
    queryFn: ({ signal }) => getHealthTrend(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useGrowthOverview(clientId: string, enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.growth(clientId),
    queryFn: ({ signal }) => getGrowthOverview(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}
