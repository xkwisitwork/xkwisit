import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type OpportunityStage = "DISCOVERY" | "QUALIFICATION" | "PROPOSAL" | "NEGOTIATION" | "CLOSED_WON" | "CLOSED_LOST";

export type Opportunity = {
  id: ID;
  organizationId: ID;
  leadId: ID | null;
  name: string;
  stage: OpportunityStage;
  estimatedValue: number | null;
  currency: Money["currency"];
  ownerId: ID | null;
  ownerName: string | null;
  description: string | null;
  nextStep: string | null;
  expectedCloseAt: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type OpportunityListItem = Pick<Opportunity, "id" | "name" | "stage" | "estimatedValue" | "ownerName" | "expectedCloseAt" | "createdAt">;
export type CreateOpportunityPayload = {
  name: string;
  leadId?: ID | null;
  stage?: OpportunityStage;
  estimatedValue?: number | null;
  currency?: Money["currency"];
  ownerId?: ID | null;
  description?: string | null;
  nextStep?: string | null;
  expectedCloseAt?: ISODateString | null;
};
export type UpdateOpportunityPayload = Partial<CreateOpportunityPayload> & { metadata?: Record<string, unknown> };
