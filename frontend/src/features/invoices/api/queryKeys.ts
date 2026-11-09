import type { InvoiceFilterState } from "../types";

export const invoiceKeys = {
  all: ["invoices"] as const,
  lists: () => [...invoiceKeys.all, "list"] as const,
  list: (filters: Partial<InvoiceFilterState>, page: number, pageSize: number) =>
    [...invoiceKeys.lists(), { filters, page, pageSize }] as const,
  details: () => [...invoiceKeys.all, "detail"] as const,
  detail: (id: string) => [...invoiceKeys.details(), id] as const,
  stats: () => [...invoiceKeys.all, "stats"] as const,
} as const;
