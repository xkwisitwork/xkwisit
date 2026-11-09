import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  ReputationOverview,
  RespondToReviewPayload,
  Review,
  ReviewListItem,
  SentimentSnapshot,
} from "../types";

const q = (clientId: string) => ({ clientId });

export async function getReputationOverview(
  clientId: string,
  signal?: AbortSignal,
): Promise<ReputationOverview> {
  return apiClient<ReputationOverview>(endpoints.reputation.overview, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function listReviews(
  clientId: string,
  signal?: AbortSignal,
): Promise<ReviewListItem[]> {
  return apiClient<ReviewListItem[]>(endpoints.reputation.reviews, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function getReview(id: string, signal?: AbortSignal): Promise<Review> {
  return apiClient<Review>(`${endpoints.reputation.reviews}/${id}`, {
    method: "GET",
    signal,
  });
}

export async function respondToReview(
  id: string,
  payload: RespondToReviewPayload,
): Promise<Review> {
  return apiClient<Review>(endpoints.reputation.respond(id), {
    method: "POST",
    body: payload,
  });
}

export async function getSentimentSnapshot(
  clientId: string,
  signal?: AbortSignal,
): Promise<SentimentSnapshot> {
  return apiClient<SentimentSnapshot>(endpoints.reputation.sentiment, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}
