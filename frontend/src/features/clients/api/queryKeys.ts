import type { ClientFilterState } from "../types";

export const clientKeys = {
  all: ["clients"] as const,

  lists: () => [...clientKeys.all, "list"] as const,
  list: (filters: Partial<ClientFilterState>, page: number, pageSize: number) =>
    [...clientKeys.lists(), { filters, page, pageSize }] as const,

  details: () => [...clientKeys.all, "detail"] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,

  businessInfo: (id: string) => [...clientKeys.detail(id), "business"] as const,
  contacts: (id: string) => [...clientKeys.detail(id), "contacts"] as const,
  access: (id: string) => [...clientKeys.detail(id), "access"] as const,
  health: (id: string) => [...clientKeys.detail(id), "health"] as const,

  stats: () => [...clientKeys.all, "stats"] as const,
  portfolio: () => [...clientKeys.all, "portfolio"] as const,
} as const;
