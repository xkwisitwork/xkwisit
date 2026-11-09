import type { ID, ISODateString } from "@/types/common";

/**
 * Xray feature types.
 */

export type XrayStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Xray = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: XrayStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type XrayListItem = Pick<
  Xray,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type XrayFilterState = {
  search: string;
  statuses: XrayStatus[];
  clientId: string | null;
};

export const emptyXrayFilters: XrayFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateXrayPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: XrayStatus;
};

export type UpdateXrayPayload = Partial<CreateXrayPayload>;

export type XrayStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
