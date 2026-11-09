import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginationMeta } from "@/types/common";

import type {
  CreateLeadPayload,
  Lead,
  LeadActivity,
  LeadFilterState,
  LeadListItem,
  LeadScoreBreakdownData,
  LeadStats,
  UpdateLeadPayload,
} from "../types";

/* ─── Query params ───────────────────────────────────── */

function buildQuery(
  filters: Partial<LeadFilterState>,
  page: number,
  pageSize: number,
): Record<string, string | number | undefined> {
  const query: Record<string, string | number | undefined> = {
    page,
    pageSize,
  };

  if (filters.search) query.search = filters.search;
  if (filters.statuses?.length) query.status = filters.statuses.join(",");
  if (filters.sources?.length) query.source = filters.sources.join(",");
  if (filters.ownerId) query.ownerId = filters.ownerId;
  if (filters.industry) query.industry = filters.industry;
  if (filters.scoreMin !== null && filters.scoreMin !== undefined)
    query.scoreMin = filters.scoreMin;
  if (filters.scoreMax !== null && filters.scoreMax !== undefined)
    query.scoreMax = filters.scoreMax;
  if (filters.createdFrom) query.createdFrom = filters.createdFrom;
  if (filters.createdTo) query.createdTo = filters.createdTo;

  return query;
}

/* ─── List ───────────────────────────────────────────── */

export async function listLeads(
  filters: Partial<LeadFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ items: LeadListItem[]; meta: PaginationMeta }> {
  const response = await apiClient<{
    data: LeadListItem[];
    meta: PaginationMeta;
  }>(endpoints.leads.list, {
    method: "GET",
    query: buildQuery(filters, page, pageSize),
    signal,
  });

  return {
    items: response?.data ?? [],
    meta: response?.meta ?? {
      page: 1,
      pageSize: 20,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  };
}

/* ─── Detail ─────────────────────────────────────────── */

export async function getLead(id: string, signal?: AbortSignal): Promise<Lead> {
  return apiClient<Lead>(endpoints.leads.detail(id), { method: "GET", signal });
}

export async function getLeadActivities(
  id: string,
  signal?: AbortSignal,
): Promise<LeadActivity[]> {
  return apiClient<LeadActivity[]>(endpoints.leads.activities(id), {
    method: "GET",
    signal,
  });
}

export async function getLeadScore(
  id: string,
  signal?: AbortSignal,
): Promise<LeadScoreBreakdownData> {
  return apiClient<LeadScoreBreakdownData>(endpoints.leads.score(id), {
    method: "GET",
    signal,
  });
}

/* ─── Mutations ──────────────────────────────────────── */

export async function createLead(payload: CreateLeadPayload): Promise<Lead> {
  return apiClient<Lead>(endpoints.leads.create, {
    method: "POST",
    body: payload,
  });
}

export async function updateLead(id: string, payload: UpdateLeadPayload): Promise<Lead> {
  return apiClient<Lead>(endpoints.leads.update(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function deleteLead(id: string): Promise<void> {
  return apiClient<void>(endpoints.leads.delete(id), { method: "DELETE" });
}

export async function archiveLead(id: string): Promise<Lead> {
  return apiClient<Lead>(`${endpoints.leads.detail(id)}/archive`, {
    method: "POST",
  });
}

export async function reassignLead(id: string, ownerId: string): Promise<Lead> {
  return apiClient<Lead>(endpoints.leads.reassign(id), {
    method: "POST",
    body: { ownerId },
  });
}

/* ─── Bulk ───────────────────────────────────────────── */

export async function bulkAction(
  ids: string[],
  action: "archive" | "delete" | "assign" | "change-status",
  payload?: { ownerId?: string; status?: string },
): Promise<{ updated: number }> {
  return apiClient<{ updated: number }>(`${endpoints.leads.list}/bulk`, {
    method: "POST",
    body: { ids, action, payload },
  });
}

/* ─── Import ─────────────────────────────────────────── */

export async function importLeads(
  rows: CreateLeadPayload[],
  options: { source: string; defaultOwnerId?: string; skipDuplicates?: boolean },
): Promise<{ imported: number; skipped: number; errors: string[] }> {
  return apiClient<{ imported: number; skipped: number; errors: string[] }>(
    endpoints.leads.import,
    {
      method: "POST",
      body: { rows, ...options },
    },
  );
}

/* ─── Stats ──────────────────────────────────────────── */

export async function getLeadStats(signal?: AbortSignal): Promise<LeadStats> {
  return apiClient<LeadStats>(`${endpoints.leads.list}/stats`, {
    method: "GET",
    signal,
  });
}
