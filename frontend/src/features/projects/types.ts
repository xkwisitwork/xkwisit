import type { ID, ISODateString, Money } from "@/types/common";
import type { ProjectStatus } from "@/lib/constants/statuses";

/* ─── Core ───────────────────────────────────────────── */

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

/* ─── Milestones ─────────────────────────────────────── */

export type ProjectMilestone = {
  id: ID;
  projectId: ID;
  name: string;
  description: string | null;
  dueDate: ISODateString | null;
  completedAt: ISODateString | null;
  order: number;
};

/* ─── Deliverables ───────────────────────────────────── */

export type ProjectDeliverable = {
  id: ID;
  projectId: ID;
  name: string;
  description: string | null;
  dueDate: ISODateString | null;
  deliveredAt: ISODateString | null;
  requiresApproval: boolean;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED" | "CHANGES_REQUESTED" | null;
  order: number;
};

/* ─── List item ──────────────────────────────────────── */

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

/* ─── Filters ────────────────────────────────────────── */

export type ProjectFilterState = {
  search: string;
  statuses: ProjectStatus[];
  clientId: string | null;
  ownerId: string | null;
};

export const emptyProjectFilters: ProjectFilterState = {
  search: "",
  statuses: [],
  clientId: null,
  ownerId: null,
};

/* ─── Payloads ───────────────────────────────────────── */

export type CreateProjectPayload = {
  clientId: string;
  name: string;
  description?: string;
  status?: ProjectStatus;
  startDate?: string;
  endDate?: string;
  ownerId?: string;
  teamMemberIds?: string[];
  budgetAmount?: number;
  currency?: "NGN" | "USD" | "GBP" | "EUR";
  tags?: string[];
};

export type UpdateProjectPayload = Partial<CreateProjectPayload> & {
  healthNote?: string;
};

/* ─── Stats ──────────────────────────────────────────── */

export type ProjectStats = {
  total: number;
  onTrack: number;
  atRisk: number;
  blocked: number;
  overdue: number;
  completed: number;
  totalBudget: Money;
};
