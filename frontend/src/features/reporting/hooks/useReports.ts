"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  createReport,
  dispatchReport,
  generateReport,
  getReport,
  listReportTemplates,
  listReports,
  listScheduledReports,
} from "../api/reports.api";
import { reportKeys } from "../api/queryKeys";
import type {
  CreateReportPayload,
  DispatchReportPayload,
  GenerateReportPayload,
} from "../types";

export function useReports(
  filters?: { clientId?: string; status?: string },
  enabled = true,
) {
  return useQuery({
    queryKey: reportKeys.list(filters as Record<string, string> | undefined),
    queryFn: ({ signal }) => listReports(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useReport(id: string, enabled = true) {
  return useQuery({
    queryKey: reportKeys.detail(id),
    queryFn: ({ signal }) => getReport(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useReportTemplates(enabled = true) {
  return useQuery({
    queryKey: reportKeys.templates(),
    queryFn: ({ signal }) => listReportTemplates(signal),
    enabled,
    staleTime: 300_000,
  });
}

export function useScheduledReports(enabled = true) {
  return useQuery({
    queryKey: reportKeys.scheduled(),
    queryFn: ({ signal }) => listScheduledReports(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useCreateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateReportPayload) => {
      try {
        return await createReport(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: reportKeys.all });
      toast.success("Report created.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useGenerateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: GenerateReportPayload) => {
      try {
        return await generateReport(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: reportKeys.all });
      toast.success("Report generated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDispatchReport(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DispatchReportPayload) => {
      try {
        return await dispatchReport(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (data) => {
      qc.setQueryData(reportKeys.detail(id), data);
      void qc.invalidateQueries({ queryKey: reportKeys.all });
      toast.success("Report sent.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
