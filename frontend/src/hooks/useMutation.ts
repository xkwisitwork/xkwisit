"use client";

import {
  useMutation as useRQmutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@/lib/api/client";
import { getErrorMessage, normalizeError } from "@/lib/api/errors";
import type { RequestOptions } from "@/types/api";

type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE";

type UseApiMutationOptions<TData, TBody, TError> = Omit<
  UseMutationOptions<TData, TError, TBody, unknown>,
  "mutationFn"
> & {
  method?: HttpMethod;
  invalidateKeys?: ReadonlyArray<ReadonlyArray<unknown>>;
  successMessage?: string;
  errorMessage?: string;
  silent?: boolean;
};

/**
 * Typed wrapper around `useMutation`.
 * Handles error normalization, toast feedback, and query invalidation.
 *
 * @example
 *   const { mutate } = useMutation<Lead, CreateLeadInput>(
 *     "/leads",
 *     {
 *       method: "POST",
 *       invalidateKeys: [["leads"]],
 *       successMessage: "Lead created.",
 *     },
 *   );
 */
export function useMutation<TData = unknown, TBody = unknown, TError = Error>(
  path: string,
  options: UseApiMutationOptions<TData, TBody, TError> = {},
): UseMutationResult<TData, TError, TBody, unknown> {
  const queryClient = useQueryClient();

  const {
    method = "POST",
    invalidateKeys,
    successMessage,
    errorMessage,
    silent,
    onSuccess,
    onError,
    ...rest
  } = options;

  return useRQmutation<TData, TError, TBody, unknown>({
    mutationFn: async (body: TBody) => {
      try {
        return await apiClient<TData>(path, {
          method,
          body: body as RequestOptions["body"],
        });
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      if (invalidateKeys?.length) {
        invalidateKeys.forEach((key) => {
          void queryClient.invalidateQueries({ queryKey: key });
        });
      }

      if (!silent && successMessage) {
        toast.success(successMessage);
      }

      onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      if (!silent) {
        toast.error(errorMessage ?? getErrorMessage(error));
      }

      onError?.(error, variables, onMutateResult, context);
    },
    ...rest,
  });
}
