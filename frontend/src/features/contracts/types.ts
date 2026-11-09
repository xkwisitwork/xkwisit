import type { ID, ISODateString } from "@/types/common";
import type { ContractStatus } from "@/lib/constants/statuses";

export type Contract = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  clientName: string;
  title: string;
  status: ContractStatus;
  valueAmount: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  startDate: ISODateString | null;
  endDate: ISODateString | null;
  signedAt: ISODateString | null;
  body: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ContractListItem = Pick<
  Contract,
  | "id"
  | "title"
  | "status"
  | "clientName"
  | "valueAmount"
  | "currency"
  | "signedAt"
  | "updatedAt"
>;

export type ContractTemplate = {
  id: string;
  name: string;
  description: string;
};

export type ContractTimelineEvent = {
  id: string;
  label: string;
  at: ISODateString;
};

export type CreateContractPayload = {
  clientId: string;
  title: string;
  valueAmount?: number;
  currency?: Contract["currency"];
  startDate?: string;
  endDate?: string;
  body?: string;
  templateId?: string;
};

export type SignContractPayload = {
  signerName: string;
  signerEmail?: string;
};
