import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  Anomaly,
  AnomalyListItem,
  AutopilotEvent,
  AutopilotRule,
  Bottleneck,
  ClientHealthSnapshot,
  GrowthOverview,
  HealthTrendPoint,
  IntelExperiment,
  IntelExperimentListItem,
  RecommendedAction,
  RevenueLeak,
  WhyDidQueryPayload,
  WhyDidResult,
} from "../types";

const q = (clientId?: string) => (clientId ? { clientId } : undefined);

export async function listAnomalies(
  clientId?: string,
  signal?: AbortSignal,
): Promise<AnomalyListItem[]> {
  return apiClient<AnomalyListItem[]>(endpoints.intelligence.anomalies, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function getAnomaly(id: string, signal?: AbortSignal): Promise<Anomaly> {
  return apiClient<Anomaly>(endpoints.intelligence.anomalyDetail(id), {
    method: "GET",
    signal,
  });
}

export async function listBottlenecks(
  clientId?: string,
  signal?: AbortSignal,
): Promise<Bottleneck[]> {
  return apiClient<Bottleneck[]>(endpoints.intelligence.bottlenecks, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function listRecommendations(
  clientId?: string,
  signal?: AbortSignal,
): Promise<RecommendedAction[]> {
  return apiClient<RecommendedAction[]>(endpoints.intelligence.recommendations, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function getClientHealth(
  clientId: string,
  signal?: AbortSignal,
): Promise<ClientHealthSnapshot> {
  return apiClient<ClientHealthSnapshot>(endpoints.intelligence.health, {
    method: "GET",
    query: { clientId },
    signal,
  });
}

export async function getHealthTrend(
  clientId: string,
  signal?: AbortSignal,
): Promise<HealthTrendPoint[]> {
  return apiClient<HealthTrendPoint[]>(`${endpoints.intelligence.health}/trend`, {
    method: "GET",
    query: { clientId },
    signal,
  });
}

export async function listRevenueLeaks(
  clientId?: string,
  signal?: AbortSignal,
): Promise<RevenueLeak[]> {
  return apiClient<RevenueLeak[]>(endpoints.intelligence.revenueLeak, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function getGrowthOverview(
  clientId: string,
  signal?: AbortSignal,
): Promise<GrowthOverview> {
  return apiClient<GrowthOverview>(`${endpoints.intelligence.health}/growth`, {
    method: "GET",
    query: { clientId },
    signal,
  });
}

export async function runWhyDid(payload: WhyDidQueryPayload): Promise<WhyDidResult> {
  return apiClient<WhyDidResult>(endpoints.intelligence.whyDid, {
    method: "POST",
    body: payload,
  });
}

export async function listIntelExperiments(
  clientId?: string,
  signal?: AbortSignal,
): Promise<IntelExperimentListItem[]> {
  return apiClient<IntelExperimentListItem[]>(endpoints.intelligence.experiments, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function getIntelExperiment(
  id: string,
  signal?: AbortSignal,
): Promise<IntelExperiment> {
  return apiClient<IntelExperiment>(endpoints.intelligence.experimentDetail(id), {
    method: "GET",
    signal,
  });
}

export async function listAutopilotRules(signal?: AbortSignal): Promise<AutopilotRule[]> {
  return apiClient<AutopilotRule[]>(endpoints.intelligence.autopilot, {
    method: "GET",
    signal,
  });
}

export async function listAutopilotEvents(
  signal?: AbortSignal,
): Promise<AutopilotEvent[]> {
  return apiClient<AutopilotEvent[]>(`${endpoints.intelligence.autopilot}/events`, {
    method: "GET",
    signal,
  });
}
