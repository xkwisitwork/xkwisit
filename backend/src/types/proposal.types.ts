import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type ProposalStatus = "DRAFT" | "SENT" | "VIEWED" | "ACCEPTED" | "REJECTED" | "EXPIRED" | "ARCHIVED";

export type Proposal = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  opportunityId: ID | null;
  name: string;
  status: ProposalStatus;
  amount: number | null;
  currency: Money["currency"];
  validUntil: ISODateString | null;
  sentAt: ISODateString | null;
  viewedAt: ISODateString | null;
  decidedAt: ISODateString | null;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ProposalListItem = Pick<Proposal, "id" | "name" | "status" | "amount" | "currency" | "clientId" | "sentAt" | "validUntil" | "createdAt">;
export type CreateProposalPayload = {
  name: string;
  clientId?: ID | null;
  opportunityId?: ID | null;
  amount?: number | null;
  currency?: Money["currency"];
  validUntil?: ISODateString | null;
  description?: string | null;
};
export type UpdateProposalPayload = Partial<CreateProposalPayload> & { status?: ProposalStatus; metadata?: Record<string, unknown> };
