export const contractKeys = {
  all: ["contracts"] as const,
  list: (filters?: Record<string, string>) =>
    [...contractKeys.all, "list", filters ?? {}] as const,
  detail: (id: string) => [...contractKeys.all, "detail", id] as const,
  templates: () => [...contractKeys.all, "templates"] as const,
} as const;
