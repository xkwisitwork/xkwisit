"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { listClients } from "../api/clients.api";
import { clientKeys } from "../api/queryKeys";
import type { ClientFilterState } from "../types";

export type UseClientsOptions = {
  filters?: Partial<ClientFilterState>;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
};

export function useClients({
  filters = {},
  page = 1,
  pageSize = 20,
  enabled = true,
}: UseClientsOptions = {}) {
  return useQuery({
    queryKey: clientKeys.list(filters, page, pageSize),
    queryFn: ({ signal }) => listClients(filters, page, pageSize, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
