"use client";

import { useQuery } from "@tanstack/react-query";

import { listBottlenecks } from "../../api/intelligence.api";
import { intelligenceKeys } from "../../api/queryKeys";

export function useBottlenecks(clientId?: string, enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.bottlenecks(clientId),
    queryFn: ({ signal }) => listBottlenecks(clientId, signal),
    enabled,
    staleTime: 30_000,
  });
}
