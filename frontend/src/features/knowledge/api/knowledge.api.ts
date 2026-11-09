import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  Framework,
  KnowledgeItem,
  KnowledgeSearchResult,
  KnowledgeTemplate,
  Playbook,
  Sop,
  SopListItem,
} from "../types";

export async function listKnowledge(signal?: AbortSignal): Promise<KnowledgeItem[]> {
  return apiClient<KnowledgeItem[]>(endpoints.knowledge.list, {
    method: "GET",
    signal,
  });
}

export async function listSops(signal?: AbortSignal): Promise<SopListItem[]> {
  return apiClient<SopListItem[]>(endpoints.knowledge.sops, {
    method: "GET",
    signal,
  });
}

export async function getSop(id: string, signal?: AbortSignal): Promise<Sop> {
  return apiClient<Sop>(endpoints.knowledge.sopDetail(id), {
    method: "GET",
    signal,
  });
}

export async function listPlaybooks(signal?: AbortSignal): Promise<Playbook[]> {
  return apiClient<Playbook[]>(endpoints.knowledge.playbooks, {
    method: "GET",
    signal,
  });
}

export async function listKnowledgeTemplates(
  signal?: AbortSignal,
): Promise<KnowledgeTemplate[]> {
  return apiClient<KnowledgeTemplate[]>(endpoints.knowledge.templates, {
    method: "GET",
    signal,
  });
}

export async function listFrameworks(signal?: AbortSignal): Promise<Framework[]> {
  return apiClient<Framework[]>(endpoints.knowledge.frameworks, {
    method: "GET",
    signal,
  });
}

export async function searchKnowledge(
  q: string,
  signal?: AbortSignal,
): Promise<KnowledgeSearchResult[]> {
  return apiClient<KnowledgeSearchResult[]>(endpoints.knowledge.search, {
    method: "GET",
    query: { q },
    signal,
  });
}
