"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  getAnalyticsEvent,
  getAnalyticsOverview,
  listAnalyticsEvents,
  runExplorerQuery,
  upsertAnalyticsEvent,
} from "../api/analytics.api";
import { analyticsKeys } from "../api/queryKeys";
import type { ExplorerQuery, UpsertEventPayload } from "../types";

export function useAnalyticsOverview(enabled = true) {
  return useQuery({
    queryKey: analyticsKeys.overview(),
    queryFn: ({ signal }) => getAnalyticsOverview(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useAnalyticsEvents(enabled = true) {
  return useQuery({
    queryKey: analyticsKeys.events(),
    queryFn: ({ signal }) => listAnalyticsEvents(signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useAnalyticsEvent(id: string, enabled = true) {
  return useQuery({
    queryKey: analyticsKeys.event(id),
    queryFn: ({ signal }) => getAnalyticsEvent(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useUpsertAnalyticsEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload, id }: { payload: UpsertEventPayload; id?: string }) => {
      try {
        return await upsertAnalyticsEvent(payload, id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: analyticsKeys.events() });
      toast.success("Event saved.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useExplorer(query: ExplorerQuery, enabled = true) {
  const key = {
    metric: query.metric,
    dimension: query.dimension ?? "",
    dateFrom: query.dateFrom ?? "",
    dateTo: query.dateTo ?? "",
  };
  return useQuery({
    queryKey: analyticsKeys.explorer(key),
    queryFn: ({ signal }) => runExplorerQuery(query, signal),
    enabled: enabled && Boolean(query.metric),
    staleTime: 30_000,
  });
}
