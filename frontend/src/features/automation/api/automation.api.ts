import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  CreateWorkflowPayload,
  TriggerType,
  UpdateWorkflowPayload,
  Workflow,
  WorkflowListItem,
  WorkflowRun,
} from "../types";

export async function listWorkflows(signal?: AbortSignal): Promise<WorkflowListItem[]> {
  return apiClient<WorkflowListItem[]>(endpoints.automation.workflows, {
    method: "GET",
    signal,
  });
}

export async function getWorkflow(id: string, signal?: AbortSignal): Promise<Workflow> {
  return apiClient<Workflow>(endpoints.automation.workflowDetail(id), {
    method: "GET",
    signal,
  });
}

export async function createWorkflow(payload: CreateWorkflowPayload): Promise<Workflow> {
  return apiClient<Workflow>(endpoints.automation.createWorkflow, {
    method: "POST",
    body: payload,
  });
}

export async function updateWorkflow(
  id: string,
  payload: UpdateWorkflowPayload,
): Promise<Workflow> {
  return apiClient<Workflow>(endpoints.automation.workflowDetail(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function runWorkflow(id: string): Promise<WorkflowRun> {
  return apiClient<WorkflowRun>(endpoints.automation.runWorkflow(id), {
    method: "POST",
  });
}

export async function listWorkflowRuns(
  workflowId?: string,
  signal?: AbortSignal,
): Promise<WorkflowRun[]> {
  return apiClient<WorkflowRun[]>(endpoints.automation.runs, {
    method: "GET",
    query: workflowId ? { workflowId } : undefined,
    signal,
  });
}

export async function getWorkflowRun(
  id: string,
  signal?: AbortSignal,
): Promise<WorkflowRun> {
  return apiClient<WorkflowRun>(endpoints.automation.runDetail(id), {
    method: "GET",
    signal,
  });
}

export async function listTriggerTypes(signal?: AbortSignal): Promise<TriggerType[]> {
  return apiClient<TriggerType[]>(endpoints.automation.triggers, {
    method: "GET",
    signal,
  });
}
