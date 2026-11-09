"use client";

import { useQuery } from "@tanstack/react-query";

export type PaymentsItem = {
  id: string;
  name: string;
  status: string;
  owner: string | null;
  updatedAt: string;
  meta?: string;
};

export type UsePaymentsOptions = {
  enabled?: boolean;
  clientId?: string | null;
};

const DEMO_ITEMS: PaymentsItem[] = [];

/**
 * usePayments - feature query hook with empty until API is wired - no mock rows.
 */
export function usePayments({
  enabled = true,
  clientId = null,
}: UsePaymentsOptions = {}) {
  return useQuery({
    queryKey: ["payments", "usePayments", { clientId }],
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
