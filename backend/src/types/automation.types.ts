import type { ID, ISODateString } from "./common.types.js";

/**
 * Automation / workflow domain types.
 */

export type AutomationStatus =
  | "DRAFT"
  | "ACTIVE"
  | "PAUSED"
  | "COMPLETED"
  | "ARCHIVED"
  | "CANCELLED";

export type AutomationTriggerType =
  | "MANUAL"
  | "SCHEDULE"
  | "EVENT"
  | "WEBHOOK";

export type Automation = {
  id: ID;
  organizationId: ID;
  name: string;
  status: AutomationStatus;
  description: string | null;
  triggerType: AutomationTriggerType;
  triggerConfig: Record<string, unknown>;
  steps: AutomationStep[];
  lastRunAt: ISODateString | null;
  nextRunAt: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AutomationStep = {
  id: ID;
  type: string;
  label: string;
  config: Record<string, unknown>;
  order: number;
};

export type AutomationRun = {
  id: ID;
  automationId: ID;
  status: "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  startedAt: ISODateString;
  finishedAt: ISODateString | null;
  errorMessage: string | null;
  logs: Array<{ at: ISODateString; message: string; level: "info" | "warn" | "error" }>;
};

export type AutomationListItem = Pick<
  Automation,
  | "id"
  | "name"
  | "status"
  | "triggerType"
  | "lastRunAt"
  | "nextRunAt"
  | "createdAt"
  | "updatedAt"
>;

export type CreateAutomationPayload = {
  name: string;
  description?: string | null;
  triggerType?: AutomationTriggerType;
  triggerConfig?: Record<string, unknown>;
  steps?: Omit<AutomationStep, "id">[];
  status?: AutomationStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateAutomationPayload = Partial<CreateAutomationPayload>;
