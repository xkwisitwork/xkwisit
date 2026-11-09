export const dashboardKeys = {
  all: ["dashboard"] as const,
  overview: (userId?: string | null, organizationId?: string | null) =>
    [
      ...dashboardKeys.all,
      "overview",
      userId ?? "anon",
      organizationId ?? "no-org",
    ] as const,
  commandCenter: (userId?: string | null, organizationId?: string | null) =>
    [
      ...dashboardKeys.all,
      "command-center",
      userId ?? "anon",
      organizationId ?? "no-org",
    ] as const,
} as const;
