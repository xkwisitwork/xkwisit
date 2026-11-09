import type { LeadFilterState, LeadListItem } from "../types";

/**
 * Query key factory for the Leads feature.
 * Keeps query keys consistent across hooks and mutations.
 */
export const leadKeys = {
  all: ["leads"] as const,

  lists: () => [...leadKeys.all, "list"] as const,
  list: (filters: Partial<LeadFilterState>, page: number, pageSize: number) =>
    [...leadKeys.lists(), { filters, page, pageSize }] as const,

  details: () => [...leadKeys.all, "detail"] as const,
  detail: (id: string) => [...leadKeys.details(), id] as const,

  activities: (id: string) => [...leadKeys.detail(id), "activities"] as const,
  score: (id: string) => [...leadKeys.detail(id), "score"] as const,

  stats: () => [...leadKeys.all, "stats"] as const,

  sources: () => [...leadKeys.all, "sources"] as const,
  followUps: () => [...leadKeys.all, "follow-ups"] as const,
} as const;

export type LeadListItemKey = readonly [
  "leads",
  "list",
  { filters: Partial<LeadFilterState>; page: number; pageSize: number },
];

/** Narrow helper for cache operations. */
export function isLeadListKey(key: readonly unknown[]): key is LeadListItemKey {
  return key[0] === "leads" && key[1] === "list";
}

export type { LeadListItem };
