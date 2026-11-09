"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getReputationOverview,
  getReview,
  getSentimentSnapshot,
  listReviews,
  respondToReview,
} from "../api/reputation.api";
import { reputationKeys } from "../api/queryKeys";
import type { RespondToReviewPayload } from "../types";

export function useReputationOverview(clientId: string, enabled = true) {
  return useQuery({
    queryKey: reputationKeys.overview(clientId),
    queryFn: ({ signal }) => getReputationOverview(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useReviews(clientId: string, enabled = true) {
  return useQuery({
    queryKey: reputationKeys.reviews(clientId),
    queryFn: ({ signal }) => listReviews(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 30_000,
  });
}

export function useReview(id: string, enabled = true) {
  return useQuery({
    queryKey: reputationKeys.review(id),
    queryFn: ({ signal }) => getReview(id, signal),
    enabled: enabled && Boolean(id),
    staleTime: 30_000,
  });
}

export function useSentimentSnapshot(clientId: string, enabled = true) {
  return useQuery({
    queryKey: reputationKeys.sentiment(clientId),
    queryFn: ({ signal }) => getSentimentSnapshot(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useRespondToReview(clientId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RespondToReviewPayload }) =>
      respondToReview(id, payload),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: reputationKeys.reviews(clientId) });
      void qc.invalidateQueries({
        queryKey: reputationKeys.overview(clientId),
      });
    },
  });
}
