"use client";

import { useQuery } from "@tanstack/react-query";

export type ExpansionItem = {
  id: string;
  name: string;
  status: string;
  owner: string | null;
  updatedAt: string;
  meta?: string;
};

export type UseExpansionOptions = {
  enabled?: boolean;
  clientId?: string | null;
};

const DEMO_ITEMS: ExpansionItem[] = [];

/**
 * useExpansion - feature query hook with empty until API is wired - no mock rows.
 */
export function useExpansion({
  enabled = true,
  clientId = null,
}: UseExpansionOptions = {}) {
  return useQuery({
    queryKey: ["expansion", "useExpansion", { clientId }],
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
