"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  createContract,
  getContract,
  listContractTemplates,
  listContracts,
  signContract,
} from "../api/contracts.api";
import { contractKeys } from "../api/queryKeys";
import type { CreateContractPayload, SignContractPayload } from "../types";

export function useContracts(
  filters?: { clientId?: string; status?: string },
  enabled = true,
) {
  return useQuery({
    queryKey: contractKeys.list(filters as Record<string, string> | undefined),
    queryFn: ({ signal }) => listContracts(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useContract(id: string, enabled = true) {
  return useQuery({
    queryKey: contractKeys.detail(id),
    queryFn: ({ signal }) => getContract(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useContractTemplates(enabled = true) {
  return useQuery({
    queryKey: contractKeys.templates(),
    queryFn: ({ signal }) => listContractTemplates(signal),
    enabled,
    staleTime: 300_000,
  });
}

export function useCreateContract() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateContractPayload) => {
      try {
        return await createContract(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: contractKeys.all });
      toast.success("Contract created.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useSignContract(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SignContractPayload) => {
      try {
        return await signContract(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (data) => {
      qc.setQueryData(contractKeys.detail(id), data);
      void qc.invalidateQueries({ queryKey: contractKeys.all });
      toast.success("Contract signed.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
