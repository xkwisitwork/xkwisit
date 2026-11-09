"use client";

import { useQuery } from "@tanstack/react-query";

import { getSop } from "../api/knowledge.api";
import { knowledgeKeys } from "../api/queryKeys";

export function useSop(id: string, enabled = true) {
  return useQuery({
    queryKey: knowledgeKeys.sop(id),
    queryFn: ({ signal }) => getSop(id, signal),
    enabled: enabled && Boolean(id),
  });
}
