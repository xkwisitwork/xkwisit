"use client";

import { useQuery } from "@tanstack/react-query";

import { listAutopilotEvents, listAutopilotRules } from "../../api/intelligence.api";
import { intelligenceKeys } from "../../api/queryKeys";

export function useAutopilotRules(enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.autopilotRules(),
    queryFn: ({ signal }) => listAutopilotRules(signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useAutopilotFeed(enabled = true) {
  return useQuery({
    queryKey: intelligenceKeys.autopilotFeed(),
    queryFn: ({ signal }) => listAutopilotEvents(signal),
    enabled,
    staleTime: 30_000,
  });
}
