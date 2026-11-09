"use client";

import { useQuery } from "@tanstack/react-query";

export type GlobalSearchItem = {
  id: string;
  name: string;
  status: string;
  owner: string | null;
  updatedAt: string;
  meta?: string;
};

export type UseGlobalSearchOptions = {
  enabled?: boolean;
  clientId?: string | null;
};

const DEMO_ITEMS: GlobalSearchItem[] = [];

/**
 * useGlobalSearch - feature query hook with empty until API is wired - no mock rows.
 */
export function useGlobalSearch({
  enabled = true,
  clientId = null,
}: UseGlobalSearchOptions = {}) {
  return useQuery({
    queryKey: ["search", "useGlobalSearch", { clientId }],
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
