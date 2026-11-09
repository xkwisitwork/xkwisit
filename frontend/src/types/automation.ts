import type { ID, ISODateString } from "./common";

/**
 * Automation domain types.
 */

export type AutomationStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Automation = {
  id: ID;
  organizationId: ID;
  name: string;
  status: AutomationStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AutomationListItem = Pick<
  Automation,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type AutomationFilterState = {
  search: string;
  statuses: AutomationStatus[];
};

export const emptyAutomationFilters: AutomationFilterState = {
  search: "",
  statuses: [],
};

export type CreateAutomationPayload = {
  name: string;
  description?: string | null;
  status?: AutomationStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateAutomationPayload = Partial<CreateAutomationPayload>;
