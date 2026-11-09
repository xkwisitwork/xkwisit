"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getWebsiteOverview,
  getWebsitePerformance,
  listWebsitePages,
} from "../api/website.api";
import { websiteKeys } from "../api/queryKeys";

export function useWebsiteOverview(clientId: string, enabled = true) {
  return useQuery({
    queryKey: websiteKeys.overview(clientId),
    queryFn: ({ signal }) => getWebsiteOverview(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useWebsitePages(clientId: string, enabled = true) {
  return useQuery({
    queryKey: websiteKeys.pages(clientId),
    queryFn: ({ signal }) => listWebsitePages(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}

export function useWebsitePerformance(clientId: string, enabled = true) {
  return useQuery({
    queryKey: websiteKeys.performance(clientId),
    queryFn: ({ signal }) => getWebsitePerformance(clientId, signal),
    enabled: enabled && Boolean(clientId),
    staleTime: 60_000,
  });
}
