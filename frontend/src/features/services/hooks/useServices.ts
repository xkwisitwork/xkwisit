"use client";

import { useQuery } from "@tanstack/react-query";

export type ServicesItem = {
  id: string;
  name: string;
  status: string;
  owner: string | null;
  updatedAt: string;
  meta?: string;
};

export type UseServicesOptions = {
  enabled?: boolean;
  clientId?: string | null;
};

const DEMO_ITEMS: ServicesItem[] = [];

/**
 * useServices - feature query hook with empty until API is wired - no mock rows.
 */
export function useServices({
  enabled = true,
  clientId = null,
}: UseServicesOptions = {}) {
  return useQuery({
    queryKey: ["services", "useServices", { clientId }],
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
