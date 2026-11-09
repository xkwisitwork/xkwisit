"use client";

import { useQuery } from "@tanstack/react-query";

export type LeadScoringItem = {
  id: string;
  name: string;
  status: string;
  owner: string | null;
  updatedAt: string;
  meta?: string;
};

export type UseLeadScoringOptions = {
  enabled?: boolean;
  clientId?: string | null;
};

const DEMO_ITEMS: LeadScoringItem[] = [];

/**
 * useLeadScoring - feature query hook with empty until API is wired - no mock rows.
 */
export function useLeadScoring({
  enabled = true,
  clientId = null,
}: UseLeadScoringOptions = {}) {
  return useQuery({
    queryKey: ["leads", "useLeadScoring", { clientId }],
    queryFn: async () => {
      const items = clientId
        ? DEMO_ITEMS.map((item) => ({ ...item, meta: clientId }))
        : DEMO_ITEMS;
      return {
        items,
        total: items.length,
        stats: {
          active: items.filter((i) => i.status === "ACTIVE").length,
          pending: items.filter((i) => i.status === "PENDING").length,
          atRisk: items.filter((i) => i.status === "AT_RISK").length,
        },
      };
    },
    enabled,
    staleTime: 30_000,
  });
}
