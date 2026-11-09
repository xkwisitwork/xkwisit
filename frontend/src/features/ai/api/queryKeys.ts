export const aiKeys = {
  all: ["ai"] as const,
  run: (kind: string) => [...aiKeys.all, "run", kind] as const,
} as const;
