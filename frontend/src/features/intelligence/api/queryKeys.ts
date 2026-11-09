export const intelligenceKeys = {
  all: ["intelligence"] as const,
  anomalies: (clientId?: string) =>
    [...intelligenceKeys.all, "anomalies", clientId ?? "all"] as const,
  anomaly: (id: string) => [...intelligenceKeys.all, "anomaly", id] as const,
  bottlenecks: (clientId?: string) =>
    [...intelligenceKeys.all, "bottlenecks", clientId ?? "all"] as const,
  recommendations: (clientId?: string) =>
    [...intelligenceKeys.all, "recommendations", clientId ?? "all"] as const,
  health: (clientId: string) => [...intelligenceKeys.all, "health", clientId] as const,
  healthTrend: (clientId: string) =>
    [...intelligenceKeys.all, "health-trend", clientId] as const,
  revenueLeak: (clientId?: string) =>
    [...intelligenceKeys.all, "revenue-leak", clientId ?? "all"] as const,
  growth: (clientId: string) => [...intelligenceKeys.all, "growth", clientId] as const,
  whyDid: (key: string) => [...intelligenceKeys.all, "why-did", key] as const,
  experiments: (clientId?: string) =>
    [...intelligenceKeys.all, "experiments", clientId ?? "all"] as const,
  experiment: (id: string) => [...intelligenceKeys.all, "experiment", id] as const,
  autopilotRules: () => [...intelligenceKeys.all, "autopilot-rules"] as const,
  autopilotFeed: () => [...intelligenceKeys.all, "autopilot-feed"] as const,
} as const;
