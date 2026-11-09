import type { ID, ISODateString, Money } from "../../types/common.types.js";

export type ServiceOfferingStatus = "ACTIVE" | "DRAFT" | "ARCHIVED";

export type ServiceOffering = {
  id: ID;
  organizationId: ID;
  name: string;
  slug: string;
  status: ServiceOfferingStatus;
  description: string | null;
  basePrice: Money | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
