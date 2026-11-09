import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  AnalyticsEvent,
  AnalyticsEventListItem,
  AnalyticsOverview,
  ConnectDataSourcePayload,
  DataSource,
  ExplorerQuery,
  ExplorerResult,
  UpsertEventPayload,
  WarehouseStatus,
} from "../types";

export async function getAnalyticsOverview(
  signal?: AbortSignal,
): Promise<AnalyticsOverview> {
  return apiClient<AnalyticsOverview>(endpoints.analytics.overview, {
    method: "GET",
    signal,
  });
}

export async function listAnalyticsEvents(
  signal?: AbortSignal,
): Promise<AnalyticsEventListItem[]> {
  return apiClient<AnalyticsEventListItem[]>(endpoints.analytics.events, {
    method: "GET",
    signal,
  });
}

export async function getAnalyticsEvent(
  id: string,
  signal?: AbortSignal,
): Promise<AnalyticsEvent> {
  return apiClient<AnalyticsEvent>(endpoints.analytics.eventDetail(id), {
    method: "GET",
    signal,
  });
}

export async function upsertAnalyticsEvent(
  payload: UpsertEventPayload,
  id?: string,
): Promise<AnalyticsEvent> {
  if (id) {
    return apiClient<AnalyticsEvent>(endpoints.analytics.eventDetail(id), {
      method: "PATCH",
      body: payload,
    });
  }
  return apiClient<AnalyticsEvent>(endpoints.analytics.events, {
    method: "POST",
    body: payload,
  });
}

export async function listDataSources(signal?: AbortSignal): Promise<DataSource[]> {
  return apiClient<DataSource[]>(endpoints.analytics.dataSources, {
    method: "GET",
    signal,
  });
}

export async function connectDataSource(
  payload: ConnectDataSourcePayload,
): Promise<DataSource> {
  return apiClient<DataSource>(endpoints.analytics.connectSource, {
    method: "POST",
    body: payload,
  });
}

export async function disconnectDataSource(id: string): Promise<void> {
  await apiClient(endpoints.analytics.disconnectSource(id), {
    method: "DELETE",
  });
}

export async function getWarehouseStatus(signal?: AbortSignal): Promise<WarehouseStatus> {
  return apiClient<WarehouseStatus>(endpoints.analytics.warehouse, {
    method: "GET",
    signal,
  });
}

export async function runExplorerQuery(
  query: ExplorerQuery,
  signal?: AbortSignal,
): Promise<ExplorerResult> {
  return apiClient<ExplorerResult>(endpoints.analytics.explorer, {
    method: "GET",
    query: {
      metric: query.metric,
      ...(query.dimension ? { dimension: query.dimension } : {}),
      ...(query.dateFrom ? { dateFrom: query.dateFrom } : {}),
      ...(query.dateTo ? { dateTo: query.dateTo } : {}),
    },
    signal,
  });
}
