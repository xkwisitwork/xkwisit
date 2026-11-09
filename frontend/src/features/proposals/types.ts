import type { ID, ISODateString } from "@/types/common";
import type { ProposalStatus } from "@/lib/constants/statuses";

/* ─── Core ───────────────────────────────────────────── */

export type Proposal = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  clientName: string;
  title: string;
  status: ProposalStatus;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  totalAmount: number;
  scope: string | null;
  deliverables: string[];
  milestones: ProposalMilestone[];
  pricingNotes: string | null;
  terms: string | null;
  templateId: string | null;
  sentAt: ISODateString | null;
  viewedAt: ISODateString | null;
  decidedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ProposalListItem = Pick<
  Proposal,
  | "id"
  | "title"
  | "status"
  | "clientName"
  | "totalAmount"
  | "currency"
  | "sentAt"
  | "updatedAt"
>;

export type ProposalMilestone = {
  id: string;
  title: string;
  amount: number;
  dueDate: ISODateString | null;
};

export type ProposalTemplate = {
  id: string;
  name: string;
  description: string;
  defaultDeliverables: string[];
};

/* ─── Payloads ───────────────────────────────────────── */

export type CreateProposalPayload = {
  clientId: string;
  title: string;
  currency?: Proposal["currency"];
  totalAmount?: number;
  scope?: string;
  deliverables?: string[];
  milestones?: Array<{ title: string; amount: number; dueDate?: string }>;
  pricingNotes?: string;
  terms?: string;
  templateId?: string;
};

export type UpdateProposalPayload = Partial<Omit<CreateProposalPayload, "clientId">> & {
  status?: ProposalStatus;
};

export type SendProposalPayload = {
  recipients: string[];
  message?: string;
};
