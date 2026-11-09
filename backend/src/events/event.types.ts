import type { ID, ISODateString } from "../types/common.types.js";

/**
 * Domain events emitted across modules.
 */

export type DomainEventName =
  | "lead.created"
  | "lead.updated"
  | "proposal.viewed"
  | "invoice.overdue"
  | "approval.pending"
  | "payment.succeeded"
  | "user.invited"
  | "workspace.updated";

export type DomainEvent<TPayload = Record<string, unknown>> = {
  id: ID;
  name: DomainEventName;
  organizationId: ID | null;
  actorId: ID | null;
  payload: TPayload;
  occurredAt: ISODateString;
};

export type LeadCreatedPayload = {
  leadId: ID;
  email: string;
  company: string;
};

export type ProposalViewedPayload = {
  proposalId: ID;
  viewerEmail: string | null;
};

export type InvoiceOverduePayload = {
  invoiceId: ID;
  clientId: ID;
  amountDue: number;
};

export type ApprovalPendingPayload = {
  approvalId: ID;
  reviewerId: ID | null;
  title: string;
};
