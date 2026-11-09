import type { ID, ISODateString } from "./common.types.js";

/**
 * Project delivery domain types.
 */

export type ProjectStatus =
  | "PLANNED"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED"
  | "ARCHIVED";

export type Project = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  clientName: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  healthNote: string | null;
  startDate: ISODateString | null;
  endDate: ISODateString | null;
  ownerId: ID | null;
  ownerName: string | null;
  teamMemberIds: ID[];
  teamMemberNames: string[];
  budgetAmount: number | null;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  tags: string[];
  progress: number;
  tasksTotal: number;
  tasksDone: number;
  milestonesTotal: number;
  milestonesDone: number;
  deliverablesTotal: number;
  deliverablesApproved: number;
  openApprovalsCount: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ProjectMilestone = {
  id: ID;
  projectId: ID;
  name: string;
  description: string | null;
  dueDate: ISODateString | null;
  completedAt: ISODateString | null;
  order: number;
};

export type ProjectDeliverable = {
  id: ID;
  projectId: ID;
  name: string;
  description: string | null;
  dueDate: ISODateString | null;
  deliveredAt: ISODateString | null;
  requiresApproval: boolean;
  approvalStatus:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "CHANGES_REQUESTED"
    | null;
  order: number;
};

export type ProjectListItem = Pick<
  Project,
  | "id"
  | "name"
  | "clientId"
  | "clientName"
  | "status"
  | "ownerName"
  | "progress"
  | "tasksTotal"
  | "tasksDone"
  | "startDate"
  | "endDate"
  | "openApprovalsCount"
>;

export type CreateProjectPayload = {
  clientId: ID;
  name: string;
  description?: string | null;
  startDate?: ISODateString | null;
  endDate?: ISODateString | null;
  ownerId?: ID | null;
  budgetAmount?: number | null;
  currency?: Project["currency"];
};

export type UpdateProjectPayload = Partial<CreateProjectPayload> & {
  status?: ProjectStatus;
  healthNote?: string | null;
  teamMemberIds?: ID[];
  tags?: string[];
  progress?: number;
};
