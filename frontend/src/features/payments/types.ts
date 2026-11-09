import type { ID, ISODateString } from "@/types/common";

/**
 * Payments feature types.
 */

export type PaymentsStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Payments = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: PaymentsStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type PaymentsListItem = Pick<
  Payments,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type PaymentsFilterState = {
  search: string;
  statuses: PaymentsStatus[];
  clientId: string | null;
};

export const emptyPaymentsFilters: PaymentsFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreatePaymentsPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: PaymentsStatus;
};

export type UpdatePaymentsPayload = Partial<CreatePaymentsPayload>;

export type PaymentsStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
