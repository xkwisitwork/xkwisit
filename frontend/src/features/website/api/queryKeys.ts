export const websiteKeys = {
  all: ["website"] as const,
  overview: (clientId: string) => [...websiteKeys.all, "overview", clientId] as const,
  pages: (clientId: string) => [...websiteKeys.all, "pages", clientId] as const,
  performance: (clientId: string) =>
    [...websiteKeys.all, "performance", clientId] as const,
  experiments: (clientId: string) =>
    [...websiteKeys.all, "experiments", clientId] as const,
  experiment: (id: string) => [...websiteKeys.all, "experiment", id] as const,
} as const;
