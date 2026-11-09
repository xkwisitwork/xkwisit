"use client";

import { useCallback, useMemo, useState } from "react";

import { emptyLeadFilters, type LeadFilterState } from "../types";

export function useLeadFilters(initial: Partial<LeadFilterState> = {}) {
  const [filters, setFilters] = useState<LeadFilterState>({
    ...emptyLeadFilters,
    ...initial,
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (filters.search) count += 1;
    if (filters.statuses.length) count += 1;
    if (filters.sources.length) count += 1;
    if (filters.ownerId) count += 1;
    if (filters.industry) count += 1;
    if (filters.scoreMin !== null) count += 1;
    if (filters.scoreMax !== null) count += 1;
    if (filters.createdFrom) count += 1;
    if (filters.createdTo) count += 1;

    return count;
  }, [filters]);

  const updateFilter = useCallback(
    <K extends keyof LeadFilterState>(key: K, value: LeadFilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [],
  );

  const reset = useCallback(() => {
    setFilters({ ...emptyLeadFilters });
    setPage(1);
  }, []);

  return {
    filters,
    page,
    pageSize,
    activeFilterCount,
    setFilters,
    updateFilter,
    setPage,
    setPageSize,
    reset,
  };
}
