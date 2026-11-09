export const assessmentKeys = {
  all: ["assessment"] as const,
  detail: (token: string) => [...assessmentKeys.all, "detail", token] as const,
  report: (token: string) => [...assessmentKeys.all, "report", token] as const,
  submissions: () => [...assessmentKeys.all, "submissions"] as const,
} as const;
