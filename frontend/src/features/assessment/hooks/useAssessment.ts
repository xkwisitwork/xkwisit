"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  getAssessment,
  listAssessmentSubmissions,
  scoreAssessment,
  startAssessment,
  submitAssessment,
} from "../api/assessment.api";
import { assessmentKeys } from "../api/queryKeys";
import type {
  ScoreAssessmentPayload,
  StartAssessmentPayload,
  SubmitAssessmentPayload,
} from "../types";

export function useAssessment(token: string, enabled = true) {
  return useQuery({
    queryKey: assessmentKeys.detail(token),
    queryFn: ({ signal }) => getAssessment(token, signal),
    enabled: enabled && Boolean(token),
  });
}

export function useAssessmentSubmissions(enabled = true) {
  return useQuery({
    queryKey: assessmentKeys.submissions(),
    queryFn: ({ signal }) => listAssessmentSubmissions(signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useStartAssessment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: StartAssessmentPayload = {}) => {
      try {
        return await startAssessment(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: assessmentKeys.submissions() });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useSubmitAssessment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SubmitAssessmentPayload) => {
      try {
        return await submitAssessment(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (data) => {
      qc.setQueryData(assessmentKeys.detail(data.token), data);
      void qc.invalidateQueries({ queryKey: assessmentKeys.submissions() });
      toast.success("Assessment submitted.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useScoreAssessment() {
  return useMutation({
    mutationFn: async (payload: ScoreAssessmentPayload) => {
      try {
        return await scoreAssessment(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
