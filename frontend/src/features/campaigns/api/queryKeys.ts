import type { CampaignFilters } from "../types";

export const campaignKeys = {
  all: ["campaigns"] as const,

  lists: () => [...campaignKeys.all, "list"] as const,
  list: (filters: Partial<CampaignFilters>, page: number, pageSize: number) =>
    [...campaignKeys.lists(), { filters, page, pageSize }] as const,

  details: () => [...campaignKeys.all, "detail"] as const,
  detail: (id: string) => [...campaignKeys.details(), id] as const,

  performance: (id: string) => [...campaignKeys.detail(id), "performance"] as const,

  attribution: (filters: Partial<CampaignFilters> = {}) =>
    [...campaignKeys.all, "attribution", filters] as const,

  channels: (filters: Partial<CampaignFilters> = {}) =>
    [...campaignKeys.all, "channels", filters] as const,

  calendar: (filters: Partial<CampaignFilters> = {}) =>
    [...campaignKeys.all, "calendar", filters] as const,

  stats: () => [...campaignKeys.all, "stats"] as const,
} as const;
