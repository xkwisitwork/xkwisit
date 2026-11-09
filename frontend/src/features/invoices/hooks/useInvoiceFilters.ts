"use client";

import { useCallback, useMemo, useState } from "react";

import { emptyInvoiceFilters, type InvoiceFilterState } from "../types";

export function useInvoiceFilters(initial: Partial<InvoiceFilterState> = {}) {
  const [filters, setFilters] = useState<InvoiceFilterState>({
    ...emptyInvoiceFilters,
    ...initial,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.search) count += 1;
    if (filters.statuses.length) count += 1;
    if (filters.paymentStatuses.length) count += 1;
    if (filters.clientId) count += 1;
    if (filters.overdueOnly) count += 1;
    return count;
  }, [filters]);

  const updateFilter = useCallback(
    <K extends keyof InvoiceFilterState>(key: K, value: InvoiceFilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [],
  );

  const reset = useCallback(() => {
    setFilters({ ...emptyInvoiceFilters });
    setPage(1);
  }, []);

  return {
    filters,
    page,
    pageSize,
    activeCount,
    setFilters,
    updateFilter,
    setPage,
    setPageSize,
    reset,
  };
}
