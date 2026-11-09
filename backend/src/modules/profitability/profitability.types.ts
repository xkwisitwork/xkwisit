import type { ID, ISODateString, Money } from "../../types/common.types.js";

export type ProfitabilitySnapshot = {
  organizationId: ID;
  clientId: ID | null;
  revenue: Money;
  cost: Money;
  marginPercent: number;
  periodStart: ISODateString;
  periodEnd: ISODateString;
};
