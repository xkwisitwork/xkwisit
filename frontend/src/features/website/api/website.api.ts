import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  CreateExperimentPayload,
  Experiment,
  ExperimentListItem,
  PagePerformanceRow,
  UpdateExperimentPayload,
  WebsiteOverview,
  WebsitePerformance,
} from "../types";

const q = (clientId: string) => ({ clientId });

export async function getWebsiteOverview(
  clientId: string,
  signal?: AbortSignal,
): Promise<WebsiteOverview> {
  return apiClient<WebsiteOverview>(endpoints.website.overview, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function listWebsitePages(
  clientId: string,
  signal?: AbortSignal,
): Promise<PagePerformanceRow[]> {
  return apiClient<PagePerformanceRow[]>(endpoints.website.pages, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function getWebsitePerformance(
  clientId: string,
  signal?: AbortSignal,
): Promise<WebsitePerformance> {
  return apiClient<WebsitePerformance>(endpoints.website.performance, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function listExperiments(
  clientId: string,
  signal?: AbortSignal,
): Promise<ExperimentListItem[]> {
  return apiClient<ExperimentListItem[]>(endpoints.website.experiments, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function getExperiment(
  id: string,
  signal?: AbortSignal,
): Promise<Experiment> {
  return apiClient<Experiment>(endpoints.website.updateExperiment(id), {
    method: "GET",
    signal,
  });
}

export async function createExperiment(
  payload: CreateExperimentPayload,
): Promise<Experiment> {
  return apiClient<Experiment>(endpoints.website.createExperiment, {
    method: "POST",
    body: payload,
  });
}

export async function updateExperiment(
  id: string,
  payload: UpdateExperimentPayload,
): Promise<Experiment> {
  return apiClient<Experiment>(endpoints.website.updateExperiment(id), {
    method: "PATCH",
    body: payload,
  });
}
