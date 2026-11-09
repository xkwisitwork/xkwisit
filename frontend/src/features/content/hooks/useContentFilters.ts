"use client";

import { useCallback, useMemo, useState } from "react";

import { emptyContentFilters, type ContentFilters } from "../types";

export function useContentFilters(initial: Partial<ContentFilters> = {}) {
  const [filters, setFilters] = useState<ContentFilters>({
    ...emptyContentFilters,
    ...initial,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.search) count += 1;
    if (filters.statuses.length) count += 1;
    if (filters.types.length) count += 1;
    if (filters.platforms.length) count += 1;
    if (filters.objectives.length) count += 1;
    if (filters.clientId) count += 1;
    if (filters.campaignId) count += 1;
    if (filters.ownerId) count += 1;
    if (filters.fromDate) count += 1;
    if (filters.toDate) count += 1;
    return count;
  }, [filters]);

  const updateFilter = useCallback(
    <K extends keyof ContentFilters>(key: K, value: ContentFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [],
  );

  const reset = useCallback(() => {
    setFilters({ ...emptyContentFilters });
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
