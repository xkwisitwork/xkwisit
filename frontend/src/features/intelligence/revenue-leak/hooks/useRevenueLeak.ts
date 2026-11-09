"use client";

import { useQuery } from "@tanstack/react-query";

import { listRevenueLeaks } from "../../api/intelligence.api";
import { intelligenceKeys } from "../../api/queryKeys";

export function useRevenueLeak(clientId?: string, enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.revenueLeak(clientId),
    queryFn: ({ signal }) => listRevenueLeaks(clientId, signal),
    enabled,
    staleTime: 30_000,
  });
}
