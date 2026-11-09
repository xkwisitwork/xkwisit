import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type { CreateTaskPayload, Task, TaskFilters, UpdateTaskPayload } from "../types";

function buildQuery(
  filters: Partial<TaskFilters>,
): Record<string, string | number | boolean | undefined> {
  const query: Record<string, string | number | boolean | undefined> = {};

  if (filters.search) query.search = filters.search;
  if (filters.statuses?.length) query.status = filters.statuses.join(",");
  if (filters.priorities?.length) query.priority = filters.priorities.join(",");
  if (filters.assigneeId) query.assigneeId = filters.assigneeId;
  if (filters.projectId) query.projectId = filters.projectId;
  if (filters.onlyMine) query.onlyMine = true;

  return query;
}

export async function listTasks(
  filters: Partial<TaskFilters> = {},
  signal?: AbortSignal,
): Promise<Task[]> {
  return apiClient<Task[]>(endpoints.tasks.list, {
    method: "GET",
    query: buildQuery(filters),
    signal,
  });
}

export async function listMyTasks(signal?: AbortSignal): Promise<Task[]> {
  return apiClient<Task[]>(endpoints.tasks.myTasks, { method: "GET", signal });
}

export async function listBoardTasks(
  filters: Partial<TaskFilters> = {},
  signal?: AbortSignal,
): Promise<Task[]> {
  return apiClient<Task[]>(endpoints.tasks.board, {
    method: "GET",
    query: buildQuery(filters),
    signal,
  });
}

export async function getTask(id: string, signal?: AbortSignal): Promise<Task> {
  return apiClient<Task>(endpoints.tasks.detail(id), { method: "GET", signal });
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  return apiClient<Task>(endpoints.tasks.create, { method: "POST", body: payload });
}

export async function updateTask(id: string, payload: UpdateTaskPayload): Promise<Task> {
  return apiClient<Task>(endpoints.tasks.update(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function moveTask(id: string, status: string): Promise<Task> {
  return apiClient<Task>(endpoints.tasks.moveStatus(id), {
    method: "POST",
    body: { status },
  });
}

export async function deleteTask(id: string): Promise<void> {
  return apiClient<void>(endpoints.tasks.delete(id), { method: "DELETE" });
}
