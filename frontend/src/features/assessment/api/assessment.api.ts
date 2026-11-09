import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  AssessmentListItem,
  AssessmentReport,
  AssessmentSubmission,
  ScoreAssessmentPayload,
  StartAssessmentPayload,
  SubmitAssessmentPayload,
} from "../types";

export async function startAssessment(
  payload: StartAssessmentPayload = {},
): Promise<AssessmentSubmission> {
  return apiClient<AssessmentSubmission>(endpoints.assessment.start, {
    method: "POST",
    body: payload,
  });
}

export async function getAssessment(
  token: string,
  signal?: AbortSignal,
): Promise<AssessmentSubmission> {
  return apiClient<AssessmentSubmission>(endpoints.assessment.detail(token), {
    method: "GET",
    signal,
  });
}

export async function submitAssessment(
  payload: SubmitAssessmentPayload,
): Promise<AssessmentSubmission> {
  return apiClient<AssessmentSubmission>(endpoints.assessment.submit, {
    method: "PUT",
    body: payload,
  });
}

export async function scoreAssessment(
  payload: ScoreAssessmentPayload,
): Promise<AssessmentReport> {
  return apiClient<AssessmentReport>(endpoints.assessment.score, {
    method: "POST",
    body: payload,
  });
}

export async function getAssessmentReport(
  token: string,
  signal?: AbortSignal,
): Promise<AssessmentReport> {
  return apiClient<AssessmentReport>(endpoints.assessment.report(token), {
    method: "GET",
    signal,
  });
}

export async function listAssessmentSubmissions(
  signal?: AbortSignal,
): Promise<AssessmentListItem[]> {
  return apiClient<AssessmentListItem[]>(endpoints.assessment.submissions, {
    method: "GET",
    signal,
  });
}
