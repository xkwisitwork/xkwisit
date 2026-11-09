"use client";

import { useQuery } from "@tanstack/react-query";

import { getLead, getLeadActivities, getLeadScore } from "../api/leads.api";
import { leadKeys } from "../api/queryKeys";

export function useLead(id: string, enabled = true) {
  return useQuery({
    queryKey: leadKeys.detail(id),
    queryFn: ({ signal }) => getLead(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useLeadActivities(id: string, enabled = true) {
  return useQuery({
    queryKey: leadKeys.activities(id),
    queryFn: ({ signal }) => getLeadActivities(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useLeadScore(id: string, enabled = true) {
  return useQuery({
    queryKey: leadKeys.score(id),
    queryFn: ({ signal }) => getLeadScore(id, signal),
    enabled: enabled && Boolean(id),
  });
}
