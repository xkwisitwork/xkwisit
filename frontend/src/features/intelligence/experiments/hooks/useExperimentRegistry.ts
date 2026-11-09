"use client";

import { useQuery } from "@tanstack/react-query";

import { getIntelExperiment, listIntelExperiments } from "../../api/intelligence.api";
import { intelligenceKeys } from "../../api/queryKeys";

export function useExperimentRegistry(clientId?: string, enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.experiments(clientId),
    queryFn: ({ signal }) => listIntelExperiments(clientId, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useIntelExperiment(id: string, enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.experiment(id),
    queryFn: ({ signal }) => getIntelExperiment(id, signal),
    enabled: enabled && Boolean(id),
  });
}
