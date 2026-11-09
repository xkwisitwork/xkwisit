import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  BrandApproval,
  BrandApprovalAction,
  BrandAsset,
  BrandAssetFilters,
  BrandGuidelines,
  BrandRevision,
  BrandStats,
  UpdateBrandGuidelinesPayload,
  UploadBrandAssetPayload,
} from "../types";

function buildAssetQuery(
  filters: Partial<BrandAssetFilters>,
): Record<string, string | undefined> {
  const query: Record<string, string | undefined> = {};
  if (filters.search) query.search = filters.search;
  if (filters.types?.length) query.type = filters.types.join(",");
  if (filters.clientId) query.clientId = filters.clientId;
  return query;
}

export async function listBrandAssets(
  filters: Partial<BrandAssetFilters> = {},
  signal?: AbortSignal,
): Promise<BrandAsset[]> {
  return apiClient<BrandAsset[]>(endpoints.brand.assets, {
    method: "GET",
    query: buildAssetQuery(filters),
    signal,
  });
}

export async function uploadBrandAsset(
  payload: UploadBrandAssetPayload,
): Promise<BrandAsset> {
  const formData = new FormData();
  formData.append("clientId", payload.clientId);
  formData.append("name", payload.name);
  formData.append("type", payload.type);
  formData.append("file", payload.file);
  if (payload.tags?.length) formData.append("tags", payload.tags.join(","));

  return apiClient<BrandAsset>(endpoints.brand.uploadAsset, {
    method: "POST",
    body: formData,
  });
}

export async function deleteBrandAsset(id: string): Promise<void> {
  return apiClient<void>(endpoints.brand.deleteAsset(id), { method: "DELETE" });
}

export async function getBrandGuidelines(
  clientId?: string | null,
  signal?: AbortSignal,
): Promise<BrandGuidelines> {
  return apiClient<BrandGuidelines>(endpoints.brand.guidelines, {
    method: "GET",
    query: clientId ? { clientId } : undefined,
    signal,
  });
}

export async function updateBrandGuidelines(
  clientId: string,
  payload: UpdateBrandGuidelinesPayload,
): Promise<BrandGuidelines> {
  return apiClient<BrandGuidelines>(endpoints.brand.guidelines, {
    method: "PATCH",
    body: { clientId, ...payload },
  });
}

export async function listBrandApprovals(
  clientId?: string | null,
  signal?: AbortSignal,
): Promise<BrandApproval[]> {
  return apiClient<BrandApproval[]>(endpoints.brand.approvals, {
    method: "GET",
    query: clientId ? { clientId } : undefined,
    signal,
  });
}

export async function approveBrandItem(
  id: string,
  payload: BrandApprovalAction = {},
): Promise<BrandApproval> {
  return apiClient<BrandApproval>(`${endpoints.brand.approvals}/${id}/approve`, {
    method: "POST",
    body: payload,
  });
}

export async function requestBrandChanges(
  id: string,
  payload: BrandApprovalAction,
): Promise<BrandApproval> {
  return apiClient<BrandApproval>(`${endpoints.brand.approvals}/${id}/request-changes`, {
    method: "POST",
    body: payload,
  });
}

export async function listBrandRevisions(
  clientId?: string | null,
  signal?: AbortSignal,
): Promise<BrandRevision[]> {
  return apiClient<BrandRevision[]>(endpoints.brand.revisions, {
    method: "GET",
    query: clientId ? { clientId } : undefined,
    signal,
  });
}

export async function getBrandStats(signal?: AbortSignal): Promise<BrandStats> {
  return apiClient<BrandStats>(`${endpoints.brand.assets}/stats`, {
    method: "GET",
    signal,
  });
}
