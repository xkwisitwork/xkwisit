"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  createExperiment,
  getExperiment,
  listExperiments,
  updateExperiment,
} from "../api/website.api";
import { websiteKeys } from "../api/queryKeys";
import type { CreateExperimentPayload, UpdateExperimentPayload } from "../types";

export function useExperiments(clientId: string, enabled = true) {
  return useQuery({
    queryKey: websiteKeys.experiments(clientId),
    queryFn: ({ signal }) => listExperiments(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 30_000,
  });
}

export function useExperiment(id: string, enabled = true) {
  return useQuery({
    queryKey: websiteKeys.experiment(id),
    queryFn: ({ signal }) => getExperiment(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useCreateExperiment(clientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateExperimentPayload) => {
      try {
        return await createExperiment(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: websiteKeys.experiments(clientId),
      });
      toast.success("Experiment created.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateExperiment(id: string, clientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateExperimentPayload) => {
      try {
        return await updateExperiment(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(websiteKeys.experiment(id), data);
      queryClient.invalidateQueries({
        queryKey: websiteKeys.experiments(clientId),
      });
      toast.success("Experiment updated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
