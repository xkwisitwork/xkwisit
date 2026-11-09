import type { ID, ISODateString } from "../../types/common.types.js";

export type FollowUpStatus = "PENDING" | "DONE" | "SKIPPED" | "CANCELLED";

export type FollowUp = {
  id: ID;
  organizationId: ID;
  leadId: ID | null;
  clientId: ID | null;
  assigneeId: ID | null;
  status: FollowUpStatus;
  dueAt: ISODateString;
  note: string | null;
  completedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
