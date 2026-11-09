import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginationMeta } from "@/types/common";

import type {
  CreateProjectPayload,
  Project,
  ProjectDeliverable,
  ProjectFilterState,
  ProjectListItem,
  ProjectMilestone,
  ProjectStats,
  UpdateProjectPayload,
} from "../types";

function buildQuery(
  filters: Partial<ProjectFilterState>,
  page: number,
  pageSize: number,
): Record<string, string | number | undefined> {
  const query: Record<string, string | number | undefined> = { page, pageSize };

  if (filters.search) query.search = filters.search;
  if (filters.statuses?.length) query.status = filters.statuses.join(",");
  if (filters.clientId) query.clientId = filters.clientId;
  if (filters.ownerId) query.ownerId = filters.ownerId;

  return query;
}

export async function listProjects(
  filters: Partial<ProjectFilterState> = {},
  page = 1,
  pageSize = 20,
  signal?: AbortSignal,
): Promise<{ items: ProjectListItem[]; meta: PaginationMeta }> {
  const response = await apiClient<{
    data: ProjectListItem[];
    meta: PaginationMeta;
  }>(endpoints.projects.list, {
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

export async function listBoardProjects(
  filters: Partial<ProjectFilterState> = {},
  signal?: AbortSignal,
): Promise<ProjectListItem[]> {
  return apiClient<ProjectListItem[]>(`${endpoints.projects.list}/board`, {
    method: "GET",
    query: buildQuery(filters, 1, 200),
    signal,
  });
}

export async function getProject(id: string, signal?: AbortSignal): Promise<Project> {
  return apiClient<Project>(endpoints.projects.detail(id), { method: "GET", signal });
}

export async function getProjectMilestones(
  id: string,
  signal?: AbortSignal,
): Promise<ProjectMilestone[]> {
  return apiClient<ProjectMilestone[]>(endpoints.projects.milestones(id), {
    method: "GET",
    signal,
  });
}

export async function getProjectDeliverables(
  id: string,
  signal?: AbortSignal,
): Promise<ProjectDeliverable[]> {
  return apiClient<ProjectDeliverable[]>(endpoints.projects.deliverables(id), {
    method: "GET",
    signal,
  });
}

export async function createProject(payload: CreateProjectPayload): Promise<Project> {
  return apiClient<Project>(endpoints.projects.create, {
    method: "POST",
    body: payload,
  });
}

export async function updateProject(
  id: string,
  payload: UpdateProjectPayload,
): Promise<Project> {
  return apiClient<Project>(endpoints.projects.update(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function archiveProject(id: string): Promise<Project> {
  return apiClient<Project>(endpoints.projects.archive(id), { method: "POST" });
}

export async function deleteProject(id: string): Promise<void> {
  return apiClient<void>(endpoints.projects.detail(id), { method: "DELETE" });
}

export async function getProjectStats(signal?: AbortSignal): Promise<ProjectStats> {
  return apiClient<ProjectStats>("/projects/stats", { method: "GET", signal });
}
