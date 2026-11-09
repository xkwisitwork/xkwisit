export const reportKeys = {
  all: ["reports"] as const,
  list: (filters?: Record<string, string>) =>
    [...reportKeys.all, "list", filters ?? {}] as const,
  detail: (id: string) => [...reportKeys.all, "detail", id] as const,
  templates: () => [...reportKeys.all, "templates"] as const,
  scheduled: () => [...reportKeys.all, "scheduled"] as const,
} as const;
