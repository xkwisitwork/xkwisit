export const automationKeys = {
  all: ["automation"] as const,
  workflows: () => [...automationKeys.all, "workflows"] as const,
  workflow: (id: string) => [...automationKeys.all, "workflow", id] as const,
  runs: (workflowId?: string) =>
    [...automationKeys.all, "runs", workflowId ?? "all"] as const,
  run: (id: string) => [...automationKeys.all, "run", id] as const,
  triggers: () => [...automationKeys.all, "triggers"] as const,
} as const;
