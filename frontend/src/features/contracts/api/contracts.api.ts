import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  Contract,
  ContractListItem,
  ContractTemplate,
  CreateContractPayload,
  SignContractPayload,
} from "../types";

export async function listContracts(
  query?: { clientId?: string; status?: string },
  signal?: AbortSignal,
): Promise<ContractListItem[]> {
  return apiClient<ContractListItem[]>(endpoints.contracts.list, {
    method: "GET",
    query,
    signal,
  });
}

export async function getContract(id: string, signal?: AbortSignal): Promise<Contract> {
  return apiClient<Contract>(endpoints.contracts.detail(id), {
    method: "GET",
    signal,
  });
}

export async function createContract(payload: CreateContractPayload): Promise<Contract> {
  return apiClient<Contract>(endpoints.contracts.create, {
    method: "POST",
    body: payload,
  });
}

export async function signContract(
  id: string,
  payload: SignContractPayload,
): Promise<Contract> {
  return apiClient<Contract>(endpoints.contracts.sign(id), {
    method: "POST",
    body: payload,
  });
}

export async function listContractTemplates(
  signal?: AbortSignal,
): Promise<ContractTemplate[]> {
  return apiClient<ContractTemplate[]>(endpoints.contracts.templates, {
    method: "GET",
    signal,
  });
}
