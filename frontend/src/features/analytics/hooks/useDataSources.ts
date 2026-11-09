"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  connectDataSource,
  disconnectDataSource,
  getWarehouseStatus,
  listDataSources,
} from "../api/analytics.api";
import { analyticsKeys } from "../api/queryKeys";
import type { ConnectDataSourcePayload } from "../types";

export function useDataSources(enabled = true) {
  return useQuery({
    queryKey: analyticsKeys.dataSources(),
    queryFn: ({ signal }) => listDataSources(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useWarehouseStatus(enabled = true) {
  return useQuery({
    queryKey: analyticsKeys.warehouse(),
    queryFn: ({ signal }) => getWarehouseStatus(signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useConnectDataSource() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ConnectDataSourcePayload) => {
      try {
        return await connectDataSource(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: analyticsKeys.dataSources() });
      toast.success("Data source connected.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDisconnectDataSource() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await disconnectDataSource(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: analyticsKeys.dataSources() });
      toast.success("Data source disconnected.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
