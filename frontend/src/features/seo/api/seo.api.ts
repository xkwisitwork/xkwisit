import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  Backlink,
  CoreWebVitalMetric,
  KeywordRanking,
  LocalSeoSnapshot,
  SeoContentRow,
  SeoOverview,
  TechnicalIssue,
} from "../types";

const q = (clientId: string) => ({ clientId });

export async function getSeoOverview(
  clientId: string,
  signal?: AbortSignal,
): Promise<SeoOverview> {
  return apiClient<SeoOverview>(endpoints.seo.overview, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function listTechnicalIssues(
  clientId: string,
  signal?: AbortSignal,
): Promise<TechnicalIssue[]> {
  return apiClient<TechnicalIssue[]>(endpoints.seo.technical, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function listCoreWebVitals(
  clientId: string,
  signal?: AbortSignal,
): Promise<CoreWebVitalMetric[]> {
  return apiClient<CoreWebVitalMetric[]>(`${endpoints.seo.technical}/vitals`, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function listSeoContent(
  clientId: string,
  signal?: AbortSignal,
): Promise<SeoContentRow[]> {
  return apiClient<SeoContentRow[]>(endpoints.seo.content, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function listBacklinks(
  clientId: string,
  signal?: AbortSignal,
): Promise<Backlink[]> {
  return apiClient<Backlink[]>(endpoints.seo.backlinks, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function listKeywordRankings(
  clientId: string,
  signal?: AbortSignal,
): Promise<KeywordRanking[]> {
  return apiClient<KeywordRanking[]>(endpoints.seo.rankings, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}

export async function getLocalSeo(
  clientId: string,
  signal?: AbortSignal,
): Promise<LocalSeoSnapshot> {
  return apiClient<LocalSeoSnapshot>(endpoints.seo.local, {
    method: "GET",
    query: q(clientId),
    signal,
  });
}
