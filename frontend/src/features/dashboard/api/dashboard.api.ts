import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type { DashboardOverview } from "../types";

function authHeaders(accessToken?: string | null): Record<string, string> | undefined {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;
}

/** Authenticated workspace overview from the API — never invents tenants. */
export async function getDashboardOverview(
  accessToken?: string | null,
  signal?: AbortSignal,
): Promise<DashboardOverview> {
  return apiClient<DashboardOverview>(endpoints.dashboard.overview, {
    method: "GET",
    headers: authHeaders(accessToken),
    signal,
  });
}

/** Same live overview as the main dashboard — kept for older call sites. */
export async function getCommandCenter(
  accessToken?: string | null,
  signal?: AbortSignal,
): Promise<DashboardOverview> {
  return getDashboardOverview(accessToken, signal);
}
