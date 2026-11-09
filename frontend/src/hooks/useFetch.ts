"use client";

import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";
import type { RequestOptions } from "@/types/api";

/**
 * Typed wrapper around `useQuery` for GET requests.
 * Centralizes error normalization and default caching behaviour.
 *
 * @example
 *   const { data, isLoading } = useFetch<Lead[]>(["leads", { status: "NEW" }], "/leads");
 */
export function useFetch<TData = unknown, TError = Error>(
  queryKey: readonly unknown[],
  path: string,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, readonly unknown[]>,
    "queryKey" | "queryFn"
  > & {
    request?: Omit<RequestOptions, "method" | "body">;
    enabled?: boolean;
  },
): UseQueryResult<TData, TError> {
  const { request, ...queryOptions } = options ?? {};

  return useQuery<TData, TError, TData, readonly unknown[]>({
    queryKey,
    queryFn: async ({ signal }) => {
      try {
        return await apiGet<TData>(path, { ...request, signal });
      } catch (error) {
        throw normalizeError(error);
      }
    },
    ...queryOptions,
  });
}
