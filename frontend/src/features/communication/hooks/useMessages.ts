"use client";

import { useQuery } from "@tanstack/react-query";

export type MessagesItem = {
  id: string;
  name: string;
  status: string;
  owner: string | null;
  updatedAt: string;
  meta?: string;
};

export type UseMessagesOptions = {
  enabled?: boolean;
  clientId?: string | null;
};

const DEMO_ITEMS: MessagesItem[] = [];

/**
 * useMessages - feature query hook with empty until API is wired - no mock rows.
 */
export function useMessages({
  enabled = true,
  clientId = null,
}: UseMessagesOptions = {}) {
  return useQuery({
    queryKey: ["communication", "useMessages", { clientId }],
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
