"use client";

import { useQuery } from "@tanstack/react-query";

export type IntegrationsItem = {
  id: string;
  name: string;
  status: string;
  owner: string | null;
  updatedAt: string;
  meta?: string;
};

export type UseIntegrationsOptions = {
  enabled?: boolean;
  clientId?: string | null;
};

const DEMO_ITEMS: IntegrationsItem[] = [];

/**
 * useIntegrations - feature query hook with empty until API is wired - no mock rows.
 */
export function useIntegrations({
  enabled = true,
  clientId = null,
}: UseIntegrationsOptions = {}) {
  return useQuery({
    queryKey: ["integrations", "useIntegrations", { clientId }],
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
