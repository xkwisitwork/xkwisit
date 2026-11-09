"use client";

import { useQuery } from "@tanstack/react-query";

import {
  listFrameworks,
  listKnowledge,
  listKnowledgeTemplates,
  listPlaybooks,
  listSops,
  searchKnowledge,
} from "../api/knowledge.api";
import { knowledgeKeys } from "../api/queryKeys";

export function useKnowledge(enabled = true) {
  return useQuery({
    queryKey: knowledgeKeys.list(),
    queryFn: ({ signal }) => listKnowledge(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useSops(enabled = true) {
  return useQuery({
    queryKey: knowledgeKeys.sops(),
    queryFn: ({ signal }) => listSops(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function usePlaybooks(enabled = true) {
  return useQuery({
    queryKey: knowledgeKeys.playbooks(),
    queryFn: ({ signal }) => listPlaybooks(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useKnowledgeTemplates(enabled = true) {
  return useQuery({
    queryKey: knowledgeKeys.templates(),
    queryFn: ({ signal }) => listKnowledgeTemplates(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useFrameworks(enabled = true) {
  return useQuery({
    queryKey: knowledgeKeys.frameworks(),
    queryFn: ({ signal }) => listFrameworks(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useKnowledgeSearch(q: string, enabled = true) {
  return useQuery({
    queryKey: knowledgeKeys.search(q),
    queryFn: ({ signal }) => searchKnowledge(q, signal),
    enabled: enabled && q.trim().length > 1,
    staleTime: 15_000,
  });
}
