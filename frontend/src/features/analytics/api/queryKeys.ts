export const analyticsKeys = {
  all: ["analytics"] as const,
  overview: () => [...analyticsKeys.all, "overview"] as const,
  events: () => [...analyticsKeys.all, "events"] as const,
  event: (id: string) => [...analyticsKeys.all, "event", id] as const,
  dataSources: () => [...analyticsKeys.all, "data-sources"] as const,
  warehouse: () => [...analyticsKeys.all, "warehouse"] as const,
  explorer: (query: Record<string, string>) =>
    [...analyticsKeys.all, "explorer", query] as const,
} as const;
