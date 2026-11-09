import type { ProjectFilterState } from "../types";

export const projectKeys = {
  all: ["projects"] as const,

  lists: () => [...projectKeys.all, "list"] as const,
  list: (filters: Partial<ProjectFilterState>, page: number, pageSize: number) =>
    [...projectKeys.lists(), { filters, page, pageSize }] as const,

  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,

  milestones: (id: string) => [...projectKeys.detail(id), "milestones"] as const,
  deliverables: (id: string) => [...projectKeys.detail(id), "deliverables"] as const,
  tasks: (id: string) => [...projectKeys.detail(id), "tasks"] as const,

  board: (filters: Partial<ProjectFilterState>) =>
    [...projectKeys.all, "board", filters] as const,

  stats: () => [...projectKeys.all, "stats"] as const,
  health: () => [...projectKeys.all, "health"] as const,
} as const;
