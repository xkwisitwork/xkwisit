import { apiClient } from "@/lib/api/client";
import type { PaginationMeta } from "@/types/common";

import type {
  CreateNotificationsPayload,
  UpdateNotificationsPayload,
  Notifications,
  NotificationsFilterState,
  NotificationsListItem,
  NotificationsStats,
} from "../types";

function buildQuery(
  filters: Partial<NotificationsFilterState>,
  page: number,
  pageSize: number,
): Record<string, string | number | boolean | null | undefined> {
  return {
    page,
    pageSize,
    search: filters.search,
    clientId: filters.clientId ?? undefined,
    status: filters.statuses?.length ? filters.statuses.join(",") : undefined,
  };
}

export async function listNotifications(
  filters: Partial<NotificationsFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ data: NotificationsListItem[]; meta: PaginationMeta }> {
  return apiClient(`/notifications`, {
    method: "GET",
    query: buildQuery(filters, page, pageSize),
    signal,
  });
}

export async function getNotifications(
  id: string,
  signal?: AbortSignal,
): Promise<Notifications> {
  return apiClient(`/notifications/${id}`, { method: "GET", signal });
}

export async function createNotifications(
  payload: CreateNotificationsPayload,
): Promise<Notifications> {
  return apiClient(`/notifications`, { method: "POST", body: payload });
}

export async function updateNotifications(
  id: string,
  payload: UpdateNotificationsPayload,
): Promise<Notifications> {
  return apiClient(`/notifications/${id}`, { method: "PATCH", body: payload });
}

export async function deleteNotifications(id: string): Promise<void> {
  await apiClient(`/notifications/${id}`, { method: "DELETE" });
}

export async function getNotificationsStats(
  signal?: AbortSignal,
): Promise<NotificationsStats> {
  return apiClient(`/notifications/stats`, { method: "GET", signal });
}
