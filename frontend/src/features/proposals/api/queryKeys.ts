export const proposalKeys = {
  all: ["proposals"] as const,
  list: (filters?: Record<string, string>) =>
    [...proposalKeys.all, "list", filters ?? {}] as const,
  detail: (id: string) => [...proposalKeys.all, "detail", id] as const,
  templates: () => [...proposalKeys.all, "templates"] as const,
} as const;
