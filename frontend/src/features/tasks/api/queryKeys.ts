import type { TaskFilters } from "../types";

/**
 * Query key factory for the Tasks feature.
 * Keeps query keys consistent across hooks and mutations.
 */
export const taskKeys = {
  all: ["tasks"] as const,

  lists: () => [...taskKeys.all, "list"] as const,
  list: (filters: Partial<TaskFilters>) => [...taskKeys.lists(), { filters }] as const,

  myTasks: () => [...taskKeys.all, "my"] as const,

  board: (filters: Partial<TaskFilters>) =>
    [...taskKeys.all, "board", { filters }] as const,

  details: () => [...taskKeys.all, "detail"] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
} as const;
