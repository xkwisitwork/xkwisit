import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type ApprovalPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type ApprovalResourceType = "DELIVERABLE" | "PROPOSAL" | "CONTRACT" | "INVOICE" | "CONTENT" | "OTHER";
export type ApprovalDecisionStatus = "PENDING" | "APPROVED" | "REJECTED" | "CHANGES_REQUESTED" | "CANCELLED";

export type Approval = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  projectId: ID | null;
  resourceType: ApprovalResourceType;
  resourceId: ID;
  title: string;
  status: ApprovalDecisionStatus;
  priority: ApprovalPriority;
  requesterId: ID;
  requesterName: string;
  reviewerId: ID | null;
  reviewerName: string | null;
  dueAt: ISODateString | null;
  decidedAt: ISODateString | null;
  notes: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ApprovalListItem = Pick<Approval, "id" | "title" | "status" | "priority" | "resourceType" | "requesterName" | "reviewerName" | "dueAt" | "createdAt">;
export type ApprovalTimelineEvent = {
  id: ID;
  approvalId: ID;
  actorId: ID | null;
  actorName: string | null;
  action: string;
  note: string | null;
  createdAt: ISODateString;
};
export type CreateApprovalPayload = {
  title: string;
  resourceType: ApprovalResourceType;
  resourceId: ID;
  clientId?: ID | null;
  projectId?: ID | null;
  priority?: ApprovalPriority;
  reviewerId?: ID | null;
  dueAt?: ISODateString | null;
  notes?: string | null;
};
export type UpdateApprovalPayload = Partial<CreateApprovalPayload> & { status?: ApprovalDecisionStatus };
