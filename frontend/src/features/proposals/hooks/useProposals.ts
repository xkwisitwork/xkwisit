"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  createProposal,
  getProposal,
  listProposalTemplates,
  listProposals,
  sendProposal,
  updateProposal,
} from "../api/proposals.api";
import { proposalKeys } from "../api/queryKeys";
import type {
  CreateProposalPayload,
  SendProposalPayload,
  UpdateProposalPayload,
} from "../types";

export function useProposals(
  filters?: { clientId?: string; status?: string },
  enabled = true,
) {
  return useQuery({
    queryKey: proposalKeys.list(filters as Record<string, string> | undefined),
    queryFn: ({ signal }) => listProposals(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useProposal(id: string, enabled = true) {
  return useQuery({
    queryKey: proposalKeys.detail(id),
    queryFn: ({ signal }) => getProposal(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useProposalTemplates(enabled = true) {
  return useQuery({
    queryKey: proposalKeys.templates(),
    queryFn: ({ signal }) => listProposalTemplates(signal),
    enabled,
    staleTime: 300_000,
  });
}

export function useCreateProposal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateProposalPayload) => {
      try {
        return await createProposal(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: proposalKeys.all });
      toast.success("Proposal created.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateProposal(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateProposalPayload) => {
      try {
        return await updateProposal(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (data) => {
      qc.setQueryData(proposalKeys.detail(id), data);
      void qc.invalidateQueries({ queryKey: proposalKeys.all });
      toast.success("Proposal updated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useSendProposal(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SendProposalPayload) => {
      try {
        return await sendProposal(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (data) => {
      qc.setQueryData(proposalKeys.detail(id), data);
      void qc.invalidateQueries({ queryKey: proposalKeys.all });
      toast.success("Proposal sent.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
