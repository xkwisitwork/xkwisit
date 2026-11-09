export const seoKeys = {
  all: ["seo"] as const,
  overview: (clientId: string) => [...seoKeys.all, "overview", clientId] as const,
  technical: (clientId: string) => [...seoKeys.all, "technical", clientId] as const,
  content: (clientId: string) => [...seoKeys.all, "content", clientId] as const,
  backlinks: (clientId: string) => [...seoKeys.all, "backlinks", clientId] as const,
  rankings: (clientId: string) => [...seoKeys.all, "rankings", clientId] as const,
  local: (clientId: string) => [...seoKeys.all, "local", clientId] as const,
  vitals: (clientId: string) => [...seoKeys.all, "vitals", clientId] as const,
} as const;
