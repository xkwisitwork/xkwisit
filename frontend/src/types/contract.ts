import type { ID, ISODateString } from "./common";

/**
 * Contract domain types.
 */

export type ContractStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Contract = {
  id: ID;
  organizationId: ID;
  name: string;
  status: ContractStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ContractListItem = Pick<
  Contract,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type ContractFilterState = {
  search: string;
  statuses: ContractStatus[];
};

export const emptyContractFilters: ContractFilterState = {
  search: "",
  statuses: [],
};

export type CreateContractPayload = {
  name: string;
  description?: string | null;
  status?: ContractStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateContractPayload = Partial<CreateContractPayload>;
