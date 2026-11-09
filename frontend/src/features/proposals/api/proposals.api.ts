import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  CreateProposalPayload,
  Proposal,
  ProposalListItem,
  ProposalTemplate,
  SendProposalPayload,
  UpdateProposalPayload,
} from "../types";

export async function listProposals(
  query?: { clientId?: string; status?: string },
  signal?: AbortSignal,
): Promise<ProposalListItem[]> {
  return apiClient<ProposalListItem[]>(endpoints.proposals.list, {
    method: "GET",
    query,
    signal,
  });
}

export async function getProposal(id: string, signal?: AbortSignal): Promise<Proposal> {
  return apiClient<Proposal>(endpoints.proposals.detail(id), {
    method: "GET",
    signal,
  });
}

export async function createProposal(payload: CreateProposalPayload): Promise<Proposal> {
  return apiClient<Proposal>(endpoints.proposals.create, {
    method: "POST",
    body: payload,
  });
}

export async function updateProposal(
  id: string,
  payload: UpdateProposalPayload,
): Promise<Proposal> {
  return apiClient<Proposal>(endpoints.proposals.update(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function sendProposal(
  id: string,
  payload: SendProposalPayload,
): Promise<Proposal> {
  return apiClient<Proposal>(endpoints.proposals.send(id), {
    method: "POST",
    body: payload,
  });
}

export async function listProposalTemplates(
  signal?: AbortSignal,
): Promise<ProposalTemplate[]> {
  return apiClient<ProposalTemplate[]>(endpoints.proposals.templates, {
    method: "GET",
    signal,
  });
}
