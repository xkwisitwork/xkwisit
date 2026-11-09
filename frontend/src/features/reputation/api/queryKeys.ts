export const reputationKeys = {
  all: ["reputation"] as const,
  overview: (clientId: string) => [...reputationKeys.all, "overview", clientId] as const,
  reviews: (clientId: string) => [...reputationKeys.all, "reviews", clientId] as const,
  review: (id: string) => [...reputationKeys.all, "review", id] as const,
  sentiment: (clientId: string) =>
    [...reputationKeys.all, "sentiment", clientId] as const,
} as const;
