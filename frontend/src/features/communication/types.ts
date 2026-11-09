import type { ID, ISODateString } from "@/types/common";

/**
 * Communication feature types.
 */

export type CommunicationStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Communication = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: CommunicationStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type CommunicationListItem = Pick<
  Communication,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type CommunicationFilterState = {
  search: string;
  statuses: CommunicationStatus[];
  clientId: string | null;
};

export const emptyCommunicationFilters: CommunicationFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateCommunicationPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: CommunicationStatus;
};

export type UpdateCommunicationPayload = Partial<CreateCommunicationPayload>;

export type CommunicationStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
