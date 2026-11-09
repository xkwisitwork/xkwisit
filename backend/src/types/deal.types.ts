import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type DealStatus = "OPEN" | "WON" | "LOST" | "ON_HOLD" | "ARCHIVED";

export type Deal = {
  id: ID;
  organizationId: ID;
  leadId: ID | null;
  clientId: ID | null;
  name: string;
  status: DealStatus;
  value: Money | null;
  probability: number;
  expectedCloseAt: ISODateString | null;
  ownerId: ID | null;
  ownerName: string | null;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type DealListItem = Pick<Deal, "id" | "name" | "status" | "value" | "probability" | "ownerName" | "expectedCloseAt" | "createdAt">;
export type CreateDealPayload = {
  name: string;
  leadId?: ID | null;
  clientId?: ID | null;
  value?: Money | null;
  probability?: number;
  expectedCloseAt?: ISODateString | null;
  ownerId?: ID | null;
  description?: string | null;
};
export type UpdateDealPayload = Partial<CreateDealPayload> & { status?: DealStatus; metadata?: Record<string, unknown> };
