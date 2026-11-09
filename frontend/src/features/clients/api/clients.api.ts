import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginationMeta } from "@/types/common";

import type {
  Client,
  ClientAccess,
  ClientBusinessInfo,
  ClientContact,
  ClientFilterState,
  ClientHealthScore,
  ClientListItem,
  ClientStats,
  CreateClientPayload,
  UpdateClientPayload,
} from "../types";

/* ─── Query builder ──────────────────────────────────── */

function buildQuery(
  filters: Partial<ClientFilterState>,
  page: number,
  pageSize: number,
): Record<string, string | number | undefined> {
  const query: Record<string, string | number | undefined> = { page, pageSize };

  if (filters.search) query.search = filters.search;
  if (filters.statuses?.length) query.status = filters.statuses.join(",");
  if (filters.tiers?.length) query.tier = filters.tiers.join(",");
  if (filters.industries?.length) query.industry = filters.industries.join(",");
  if (filters.healthLevels?.length) query.healthLevel = filters.healthLevels.join(",");
  if (filters.accountManagerId) query.accountManagerId = filters.accountManagerId;

  return query;
}

/* ─── List ───────────────────────────────────────────── */

export async function listClients(
  filters: Partial<ClientFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ items: ClientListItem[]; meta: PaginationMeta }> {
  const response = await apiClient<{
    data: ClientListItem[];
    meta: PaginationMeta;
  }>(endpoints.clients.list, {
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

export async function getClient(id: string, signal?: AbortSignal): Promise<Client> {
  return apiClient<Client>(endpoints.clients.detail(id), { method: "GET", signal });
}

export async function getClientBusinessInfo(
  id: string,
  signal?: AbortSignal,
): Promise<ClientBusinessInfo> {
  return apiClient<ClientBusinessInfo>(endpoints.clients.businessInfo(id), {
    method: "GET",
    signal,
  });
}

export async function getClientContacts(
  id: string,
  signal?: AbortSignal,
): Promise<ClientContact[]> {
  return apiClient<ClientContact[]>(endpoints.clients.contacts(id), {
    method: "GET",
    signal,
  });
}

export async function getClientAccess(
  id: string,
  signal?: AbortSignal,
): Promise<ClientAccess[]> {
  return apiClient<ClientAccess[]>(endpoints.clients.access(id), {
    method: "GET",
    signal,
  });
}

export async function getClientHealth(
  id: string,
  signal?: AbortSignal,
): Promise<ClientHealthScore> {
  return apiClient<ClientHealthScore>(endpoints.clients.health(id), {
    method: "GET",
    signal,
  });
}

/* ─── Mutations ──────────────────────────────────────── */

export async function createClient(payload: CreateClientPayload): Promise<Client> {
  return apiClient<Client>(endpoints.clients.create, {
    method: "POST",
    body: payload,
  });
}

export async function updateClient(
  id: string,
  payload: UpdateClientPayload,
): Promise<Client> {
  return apiClient<Client>(endpoints.clients.update(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function archiveClient(id: string): Promise<Client> {
  return apiClient<Client>(endpoints.clients.archive(id), { method: "POST" });
}

export async function deleteClient(id: string): Promise<void> {
  return apiClient<void>(endpoints.clients.detail(id), { method: "DELETE" });
}

/* ─── Stats ──────────────────────────────────────────── */

export async function getClientStats(signal?: AbortSignal): Promise<ClientStats> {
  return apiClient<ClientStats>(`${endpoints.clients.list}/stats`, {
    method: "GET",
    signal,
  });
}
