import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginationMeta } from "@/types/common";

import type {
  Approval,
  ApprovalDecisionPayload,
  ApprovalFilterState,
  ApprovalListItem,
  ApprovalStats,
  ApprovalTimelineEvent,
  CreateApprovalPayload,
  UpdateApprovalPayload,
} from "../types";

function buildQuery(
  filters: Partial<ApprovalFilterState>,
  page?: number,
  pageSize?: number,
): Record<string, string | number | boolean | null | undefined> {
  return {
    page,
    pageSize,
    search: filters.search,
    clientId: filters.clientId ?? undefined,
    assigneeId: filters.assigneeId ?? undefined,
    priority: filters.priority ?? undefined,
    status: filters.statuses?.length ? filters.statuses.join(",") : undefined,
    resourceType: filters.resourceTypes?.length
      ? filters.resourceTypes.join(",")
      : undefined,
  };
}

export async function listApprovals(
  filters: Partial<ApprovalFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ items: ApprovalListItem[]; meta: PaginationMeta }> {
  const response = await apiClient<{
    data: ApprovalListItem[];
    meta: PaginationMeta;
  }>(endpoints.approvals.list, {
    method: "GET",
    query: buildQuery(filters, page, pageSize),
    signal,
  });

  return {
    items: response?.data ?? [],
    meta: response?.meta ?? {
      page,
      pageSize,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  };
}

export async function listPendingApprovals(
  filters: Partial<ApprovalFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
) {
  return listApprovals(
    { ...filters, statuses: ["PENDING", "CHANGES_REQUESTED"] },
    page,
    pageSize,
    signal,
  );
}

export async function listApprovalHistory(
  filters: Partial<ApprovalFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
) {
  return listApprovals(
    { ...filters, statuses: ["APPROVED", "REJECTED"] },
    page,
    pageSize,
    signal,
  );
}

export async function getApproval(id: string, signal?: AbortSignal): Promise<Approval> {
  return apiClient(endpoints.approvals.detail(id), { method: "GET", signal });
}

export async function getApprovalTimeline(
  id: string,
  signal?: AbortSignal,
): Promise<ApprovalTimelineEvent[]> {
  const response = await apiClient<{ data: ApprovalTimelineEvent[] }>(
    `${endpoints.approvals.detail(id)}/timeline`,
    { method: "GET", signal },
  );
  return response?.data ?? [];
}

export async function createApproval(payload: CreateApprovalPayload): Promise<Approval> {
  return apiClient(endpoints.approvals.list, {
    method: "POST",
    body: payload,
  });
}

export async function updateApproval(
  id: string,
  payload: UpdateApprovalPayload,
): Promise<Approval> {
  return apiClient(endpoints.approvals.detail(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function approveApproval(
  id: string,
  payload: ApprovalDecisionPayload = {},
): Promise<Approval> {
  return apiClient(endpoints.approvals.approve(id), {
    method: "POST",
    body: payload,
  });
}

export async function rejectApproval(
  id: string,
  payload: ApprovalDecisionPayload = {},
): Promise<Approval> {
  return apiClient(endpoints.approvals.reject(id), {
    method: "POST",
    body: payload,
  });
}

export async function requestApprovalChanges(
  id: string,
  payload: ApprovalDecisionPayload = {},
): Promise<Approval> {
  return apiClient(endpoints.approvals.requestChanges(id), {
    method: "POST",
    body: payload,
  });
}

export async function getApprovalStats(signal?: AbortSignal): Promise<ApprovalStats> {
  return apiClient(`${endpoints.approvals.list}/stats`, {
    method: "GET",
    signal,
  });
}
