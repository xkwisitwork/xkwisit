export const knowledgeKeys = {
  all: ["knowledge"] as const,
  list: () => [...knowledgeKeys.all, "list"] as const,
  sops: () => [...knowledgeKeys.all, "sops"] as const,
  sop: (id: string) => [...knowledgeKeys.all, "sop", id] as const,
  playbooks: () => [...knowledgeKeys.all, "playbooks"] as const,
  templates: () => [...knowledgeKeys.all, "templates"] as const,
  frameworks: () => [...knowledgeKeys.all, "frameworks"] as const,
  search: (q: string) => [...knowledgeKeys.all, "search", q] as const,
} as const;
