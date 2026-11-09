"use client";

import { useQuery } from "@tanstack/react-query";

import { getAnomaly, listAnomalies } from "../../api/intelligence.api";
import { intelligenceKeys } from "../../api/queryKeys";

export function useAnomalies(clientId?: string, enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.anomalies(clientId),
    queryFn: ({ signal }) => listAnomalies(clientId, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useAnomaly(id: string, enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.anomaly(id),
    queryFn: ({ signal }) => getAnomaly(id, signal),
    enabled: enabled && Boolean(id),
  });
}
