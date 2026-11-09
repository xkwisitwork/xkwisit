export const teamKeys = {
  all: ["team"] as const,
  members: () => [...teamKeys.all, "members"] as const,
  member: (id: string) => [...teamKeys.all, "member", id] as const,
  capacity: () => [...teamKeys.all, "capacity"] as const,
  timesheets: () => [...teamKeys.all, "timesheets"] as const,
  utilization: () => [...teamKeys.all, "utilization"] as const,
} as const;
