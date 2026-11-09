import type { PaginationMeta } from "@/types/common";

import { apiClient } from "./client";
import { ApiRequestError } from "./errors";

/**
 * TanStack Query–compatible fetcher.
 * Accepts a key array - the first element is the path, the second (optional)
 * is a query params object. This lets components define query keys that
 * TanStack can hash deterministically.
 *
 * @example
 * useQuery({
 * queryKey: ["leads", { status: "NEW", page: 1 }],
 * queryFn: fetcher,
 * });
 */
export async function fetcher<TData = unknown>({
  queryKey,
  signal,
}: {
  queryKey: readonly unknown[];
  signal?: AbortSignal;
}): Promise<TData> {
  const [path, query] = queryKey;

  if (typeof path !== "string") {
    throw new ApiRequestError({
      code: "BAD_REQUEST",
      message: "Fetcher query key must begin with a path string.",
      status: 400,
    });
  }

  return apiClient<TData>(path, {
    method: "GET",
    query: query as Record<string, string | number | boolean | undefined | null>,
    signal,
  });
}

/**
 * Fetcher for paginated endpoints.
 * Returns items and pagination metadata in a stable shape.
 */
export async function paginatedFetcher<TItem>({
  queryKey,
  signal,
}: {
  queryKey: readonly unknown[];
  signal?: AbortSignal;
}): Promise<{ items: TItem[]; meta: PaginationMeta }> {
  const [path, query] = queryKey;

  if (typeof path !== "string") {
    throw new ApiRequestError({
      code: "BAD_REQUEST",
      message: "Paginated fetcher query key must begin with a path string.",
      status: 400,
    });
  }

  const response = await apiClient<{
    data: TItem[];
    meta: PaginationMeta;
  }>(path, {
    method: "GET",
    query: query as Record<string, string | number | boolean | undefined | null>,
    signal,
  });

  return {
    items: response?.data ?? [],
    meta: response?.meta ?? {
      page: 1,
      pageSize: 20,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  };
}
