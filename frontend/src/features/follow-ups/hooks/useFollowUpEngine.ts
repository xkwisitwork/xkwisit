"use client";

import { useQuery } from "@tanstack/react-query";

import type { FollowUpQueueData, FollowUpRuleData, StaleProspect } from "../types";

async function fetchQueue(): Promise<FollowUpQueueData> {
  return {
    overdue: [],
    today: [],
    upcoming: [],
  };
}

export function useFollowUpQueue(enabled = true) {
  return useQuery({
    queryKey: ["follow-ups", "queue"],
    queryFn: fetchQueue,
    enabled,
    staleTime: 30_000,
  });
}

export function useFollowUpRules(enabled = true) {
  return useQuery({
    queryKey: ["follow-ups", "rules"],
    queryFn: async (): Promise<FollowUpRuleData[]> => [],
    enabled,
    staleTime: 60_000,
  });
}

export function useStaleProspects(enabled = true) {
  return useQuery({
    queryKey: ["follow-ups", "stale"],
    queryFn: async (): Promise<StaleProspect[]> => [],
    enabled,
    staleTime: 60_000,
  });
}

/** Scaffold alias */
export function useFollowUpEngine() {
  const queue = useFollowUpQueue();
  const rules = useFollowUpRules();
  const stale = useStaleProspects();
  return { queue, rules, stale };
}
