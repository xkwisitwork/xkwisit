import type { ID, ISODateString } from "@/types/common";
import type { ApprovalStatus } from "@/lib/constants/statuses";

export type ApprovalResourceType =
  | "CONTENT"
  | "CREATIVE"
  | "PROPOSAL"
  | "CONTRACT"
  | "BRAND_ASSET"
  | "CAMPAIGN"
  | "DELIVERABLE"
  | "INVOICE"
  | "OTHER";

export type ApprovalPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export type Approval = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  clientName: string | null;
  title: string;
  summary: string | null;
  resourceType: ApprovalResourceType;
  resourceId: ID;
  resourceHref: string | null;
  status: ApprovalStatus;
  priority: ApprovalPriority;
  requesterId: ID | null;
  requesterName: string | null;
  assigneeId: ID | null;
  assigneeName: string | null;
  dueAt: ISODateString | null;
  decidedAt: ISODateString | null;
  decisionNote: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ApprovalEventType =
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED"
  | "CHANGES_REQUESTED"
  | "REASSIGNED"
  | "COMMENTED"
  | "EXPIRED";

export type ApprovalTimelineEvent = {
  id: ID;
  approvalId: ID;
  type: ApprovalEventType;
  actorId: ID | null;
  actorName: string | null;
  note: string | null;
  createdAt: ISODateString;
};

export type ApprovalListItem = Pick<
  Approval,
  | "id"
  | "title"
  | "clientId"
  | "clientName"
  | "resourceType"
  | "status"
  | "priority"
  | "requesterName"
  | "assigneeName"
  | "dueAt"
  | "createdAt"
  | "updatedAt"
>;

export type ApprovalFilterState = {
  search: string;
  statuses: ApprovalStatus[];
  resourceTypes: ApprovalResourceType[];
  clientId: string | null;
  assigneeId: string | null;
  priority: ApprovalPriority | null;
};

export const emptyApprovalFilters: ApprovalFilterState = {
  search: "",
  statuses: [],
  resourceTypes: [],
  clientId: null,
  assigneeId: null,
  priority: null,
};

export type CreateApprovalPayload = {
  title: string;
  summary?: string | null;
  clientId?: string | null;
  resourceType: ApprovalResourceType;
  resourceId: string;
  resourceHref?: string | null;
  priority?: ApprovalPriority;
  assigneeId?: string | null;
  dueAt?: string | null;
};

export type UpdateApprovalPayload = Partial<CreateApprovalPayload> & {
  status?: ApprovalStatus;
  decisionNote?: string | null;
};

export type ApprovalDecisionPayload = {
  note?: string | null;
};

export type ApprovalStats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  changesRequested: number;
  overdue: number;
};
