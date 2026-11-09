import type { OpportunityFilterState } from "../types";

export const opportunityKeys = {
  all: ["opportunities"] as const,
  lists: () => [...opportunityKeys.all, "list"] as const,
  list: (filters: Partial<OpportunityFilterState>, page: number, pageSize: number) =>
    [...opportunityKeys.lists(), { filters, page, pageSize }] as const,
  details: () => [...opportunityKeys.all, "detail"] as const,
  detail: (id: string) => [...opportunityKeys.details(), id] as const,
  stats: () => [...opportunityKeys.all, "stats"] as const,
} as const;
