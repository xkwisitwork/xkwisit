"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getLocalSeo,
  getSeoOverview,
  listBacklinks,
  listCoreWebVitals,
  listKeywordRankings,
  listSeoContent,
  listTechnicalIssues,
} from "../api/seo.api";
import { seoKeys } from "../api/queryKeys";

export function useSeoOverview(clientId: string, enabled = true) {
  return useQuery({
    queryKey: seoKeys.overview(clientId),
    queryFn: ({ signal }) => getSeoOverview(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useTechnicalIssues(clientId: string, enabled = true) {
  return useQuery({
    queryKey: seoKeys.technical(clientId),
    queryFn: ({ signal }) => listTechnicalIssues(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useCoreWebVitals(clientId: string, enabled = true) {
  return useQuery({
    queryKey: seoKeys.vitals(clientId),
    queryFn: ({ signal }) => listCoreWebVitals(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useSeoContent(clientId: string, enabled = true) {
  return useQuery({
    queryKey: seoKeys.content(clientId),
    queryFn: ({ signal }) => listSeoContent(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useBacklinks(clientId: string, enabled = true) {
  return useQuery({
    queryKey: seoKeys.backlinks(clientId),
    queryFn: ({ signal }) => listBacklinks(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useKeywordRankings(clientId: string, enabled = true) {
  return useQuery({
    queryKey: seoKeys.rankings(clientId),
    queryFn: ({ signal }) => listKeywordRankings(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useLocalSeo(clientId: string, enabled = true) {
  return useQuery({
    queryKey: seoKeys.local(clientId),
    queryFn: ({ signal }) => getLocalSeo(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}
