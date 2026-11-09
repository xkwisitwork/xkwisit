"use client";

import { useQuery } from "@tanstack/react-query";

export type GrowthGraphItem = {
  id: string;
  name: string;
  status: string;
  owner: string | null;
  updatedAt: string;
  meta?: string;
};

export type UseGrowthGraphOptions = {
  enabled?: boolean;
  clientId?: string | null;
};

const DEMO_ITEMS: GrowthGraphItem[] = [];

/**
 * useGrowthGraph - feature query hook with empty until API is wired - no mock rows.
 */
export function useGrowthGraph({
  enabled = true,
  clientId = null,
}: UseGrowthGraphOptions = {}) {
  return useQuery({
    queryKey: ["growth-graph", "useGrowthGraph", { clientId }],
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
