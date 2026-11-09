import type { ContentFilters } from "../types";

export const contentKeys = {
  all: ["content"] as const,

  lists: () => [...contentKeys.all, "list"] as const,
  list: (filters: Partial<ContentFilters>, page: number, pageSize: number) =>
    [...contentKeys.lists(), { filters, page, pageSize }] as const,

  details: () => [...contentKeys.all, "detail"] as const,
  detail: (id: string) => [...contentKeys.details(), id] as const,

  calendar: (filters: Partial<ContentFilters> = {}) =>
    [...contentKeys.all, "calendar", filters] as const,

  pipeline: (filters: Partial<ContentFilters> = {}) =>
    [...contentKeys.all, "pipeline", filters] as const,

  library: (filters: Partial<ContentFilters> = {}) =>
    [...contentKeys.all, "library", filters] as const,

  performance: (filters: Partial<ContentFilters> = {}) =>
    [...contentKeys.all, "performance", filters] as const,

  stats: () => [...contentKeys.all, "stats"] as const,
} as const;
