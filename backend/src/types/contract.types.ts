import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type ContractStatus = "DRAFT" | "SENT" | "SIGNED" | "ACTIVE" | "EXPIRED" | "TERMINATED" | "ARCHIVED";

export type Contract = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  proposalId: ID | null;
  name: string;
  status: ContractStatus;
  value: number | null;
  currency: Money["currency"];
  startsAt: ISODateString | null;
  endsAt: ISODateString | null;
  signedAt: ISODateString | null;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ContractListItem = Pick<Contract, "id" | "name" | "status" | "clientId" | "value" | "startsAt" | "endsAt" | "signedAt" | "createdAt">;
export type CreateContractPayload = {
  name: string;
  clientId: ID;
  proposalId?: ID | null;
  value?: number | null;
  currency?: Money["currency"];
  startsAt?: ISODateString | null;
  endsAt?: ISODateString | null;
  description?: string | null;
};
export type UpdateContractPayload = Partial<CreateContractPayload> & { status?: ContractStatus; metadata?: Record<string, unknown> };
