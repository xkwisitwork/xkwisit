"use client";

import { useCallback, useMemo, useState } from "react";

import { emptyClientFilters, type ClientFilterState } from "../types";

export function useClientFilters(initial: Partial<ClientFilterState> = {}) {
  const [filters, setFilters] = useState<ClientFilterState>({
    ...emptyClientFilters,
    ...initial,
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const activeCount = useMemo(() => {
    let count = 0;

    if (filters.search) count += 1;
    if (filters.statuses.length) count += 1;
    if (filters.tiers.length) count += 1;
    if (filters.industries.length) count += 1;
    if (filters.healthLevels.length) count += 1;
    if (filters.accountManagerId) count += 1;

    return count;
  }, [filters]);

  const updateFilter = useCallback(
    <K extends keyof ClientFilterState>(key: K, value: ClientFilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [],
  );

  const reset = useCallback(() => {
    setFilters({ ...emptyClientFilters });
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
