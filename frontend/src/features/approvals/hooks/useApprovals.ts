"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  getApproval,
  getApprovalStats,
  getApprovalTimeline,
  listApprovals,
} from "../api/approvals.api";
import { approvalKeys } from "../api/queryKeys";
import type { ApprovalFilterState } from "../types";

export type UseApprovalsOptions = {
  filters?: Partial<ApprovalFilterState>;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
};

export function useApprovals({
  filters = {},
  page = 1,
  pageSize = 20,
  enabled = true,
}: UseApprovalsOptions = {}) {
  return useQuery({
    queryKey: approvalKeys.list(filters, page, pageSize),
    queryFn: ({ signal }) => listApprovals(filters, page, pageSize, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useApproval(id: string, enabled = true) {
  return useQuery({
    queryKey: approvalKeys.detail(id),
    queryFn: ({ signal }) => getApproval(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useApprovalTimeline(id: string, enabled = true) {
  return useQuery({
    queryKey: approvalKeys.timeline(id),
    queryFn: ({ signal }) => getApprovalTimeline(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useApprovalStats(enabled = true) {
  return useQuery({
    queryKey: approvalKeys.stats(),
    queryFn: ({ signal }) => getApprovalStats(signal),
    enabled,
    staleTime: 60_000,
  });
}
