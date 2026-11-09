"use client";

import { useQuery } from "@tanstack/react-query";

import { listRecommendations } from "../../api/intelligence.api";
import { intelligenceKeys } from "../../api/queryKeys";

export function useRecommendations(clientId?: string, enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.recommendations(clientId),
    queryFn: ({ signal }) => listRecommendations(clientId, signal),
    enabled,
    staleTime: 30_000,
  });
}
