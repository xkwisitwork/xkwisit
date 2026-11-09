"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  createWorkflow,
  getWorkflow,
  listTriggerTypes,
  listWorkflowRuns,
  listWorkflows,
  runWorkflow,
  updateWorkflow,
} from "../api/automation.api";
import { automationKeys } from "../api/queryKeys";
import type { CreateWorkflowPayload, UpdateWorkflowPayload } from "../types";

export function useWorkflows(enabled = true) {
  return useQuery({
    queryKey: automationKeys.workflows(),
    queryFn: ({ signal }) => listWorkflows(signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useWorkflow(id: string, enabled = true) {
  return useQuery({
    queryKey: automationKeys.workflow(id),
    queryFn: ({ signal }) => getWorkflow(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useWorkflowRuns(workflowId?: string, enabled = true) {
  return useQuery({
    queryKey: automationKeys.runs(workflowId),
    queryFn: ({ signal }) => listWorkflowRuns(workflowId, signal),
    enabled,
    staleTime: 15_000,
  });
}

export function useTriggerTypes(enabled = true) {
  return useQuery({
    queryKey: automationKeys.triggers(),
    queryFn: ({ signal }) => listTriggerTypes(signal),
    enabled,
    staleTime: 300_000,
  });
}

export function useCreateWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateWorkflowPayload) => {
      try {
        return await createWorkflow(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: automationKeys.workflows() });
      toast.success("Workflow created.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateWorkflow(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateWorkflowPayload) => {
      try {
        return await updateWorkflow(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (data) => {
      qc.setQueryData(automationKeys.workflow(id), data);
      void qc.invalidateQueries({ queryKey: automationKeys.workflows() });
      toast.success("Workflow updated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useRunWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        return await runWorkflow(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (_data, id) => {
      void qc.invalidateQueries({ queryKey: automationKeys.runs(id) });
      void qc.invalidateQueries({ queryKey: automationKeys.runs() });
      toast.success("Workflow run started.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
