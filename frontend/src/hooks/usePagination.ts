"use client";

import { useCallback, useMemo, useState } from "react";

export type UsePaginationOptions = {
  initialPage?: number;
  initialPageSize?: number;
  total?: number;
  pageSizeOptions?: number[];
};

export type UsePaginationReturn = {
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  from: number;
  to: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  next: () => void;
  prev: () => void;
  first: () => void;
  last: () => void;
  reset: () => void;
  pageSizeOptions: number[];
};

/**
 * Client-side pagination state.
 * For server-driven pagination, prefer the pagination meta returned by the API
 * and just keep `page` and `pageSize` in component state.
 */
export function usePagination({
  initialPage = 1,
  initialPageSize = 20,
  total = 0,
  pageSizeOptions = [10, 20, 50, 100],
}: UsePaginationOptions = {}): UsePaginationReturn {
  const [page, setPageState] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize],
  );

  const setPage = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(1, next), totalPages);

      setPageState(clamped);
    },
    [totalPages],
  );

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size);
    setPageState(1);
  }, []);

  const next = useCallback(() => setPage(page + 1), [page, setPage]);
  const prev = useCallback(() => setPage(page - 1), [page, setPage]);
  const first = useCallback(() => setPage(1), [setPage]);
  const last = useCallback(() => setPage(totalPages), [setPage, totalPages]);

  const reset = useCallback(() => {
    setPageState(initialPage);
    setPageSizeState(initialPageSize);
  }, [initialPage, initialPageSize]);

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return {
    page,
    pageSize,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    from,
    to,
    setPage,
    setPageSize,
    next,
    prev,
    first,
    last,
    reset,
    pageSizeOptions,
  };
}
