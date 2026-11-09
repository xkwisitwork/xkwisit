import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type WorkflowStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "ARCHIVED";

export type WorkflowRunStatus =
  "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";

export type TriggerType = "MANUAL" | "SCHEDULE" | "WEBHOOK" | "EVENT" | "THRESHOLD";

export type ActionType =
  "NOTIFY" | "CREATE_TASK" | "UPDATE_STATUS" | "WEBHOOK" | "AI_RUN" | "OTHER";

/* ─── Core ───────────────────────────────────────────── */

export type Workflow = {
  id: ID;
  organizationId: ID;
  name: string;
  description: string | null;
  status: WorkflowStatus;
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  lastRunAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type WorkflowListItem = Pick<
  Workflow,
  "id" | "name" | "status" | "lastRunAt" | "updatedAt"
> & {
  triggerType: TriggerType;
  runCount: number;
};

export type WorkflowTrigger = {
  type: TriggerType;
  label: string;
  config: Record<string, string>;
};

export type WorkflowCondition = {
  id: string;
  field: string;
  operator: "eq" | "neq" | "gt" | "lt" | "contains";
  value: string;
};

export type WorkflowAction = {
  id: string;
  type: ActionType;
  label: string;
  config: Record<string, string>;
};

export type WorkflowRun = {
  id: ID;
  workflowId: ID;
  workflowName: string;
  status: WorkflowRunStatus;
  startedAt: ISODateString;
  finishedAt: ISODateString | null;
  log: string[];
  errorMessage: string | null;
};

/* ─── Payloads ───────────────────────────────────────── */

export type CreateWorkflowPayload = {
  name: string;
  description?: string;
  trigger: WorkflowTrigger;
  conditions?: WorkflowCondition[];
  actions: WorkflowAction[];
  status?: WorkflowStatus;
};

export type UpdateWorkflowPayload = Partial<CreateWorkflowPayload>;

export type WorkflowTemplate = {
  id: string;
  name: string;
  description: string;
  triggerType: TriggerType;
  actionTypes: ActionType[];
};
