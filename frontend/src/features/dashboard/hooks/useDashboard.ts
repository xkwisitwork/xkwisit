"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getDashboardOverview } from "../api/dashboard.api";
import { dashboardKeys } from "../api/queryKeys";

/**
 * Live workspace overview. Retries transient auth/network blips so the shell
 * does not flash a hard error on first paint.
 * Query keys are scoped by userId + orgId so account switches never reuse cache.
 */
export function useDashboard(enabled = true) {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const userId = session?.user?.id ?? null;
  const organizationId = session?.user?.organizationId ?? null;
  const sessionReady =
    status === "authenticated" && Boolean(accessToken) && Boolean(userId);

  const query = useQuery({
    queryKey: [...dashboardKeys.overview(userId, organizationId)],
    queryFn: ({ signal }) => getDashboardOverview(accessToken, signal),
    enabled: enabled && sessionReady,
    staleTime: 30_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 4000),
    refetchOnWindowFocus: true,
  });

  return {
    ...query,
    isLoading:
      status === "loading" ||
      (status === "authenticated" && !accessToken) ||
      (sessionReady && query.isLoading && !query.data),
  };
}

/** @deprecated Prefer `useDashboard` — command center shares the overview payload. */
export function useCommandCenter(enabled = true) {
  return useDashboard(enabled);
}
