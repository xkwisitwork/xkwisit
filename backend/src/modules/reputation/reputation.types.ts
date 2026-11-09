import type { ID, ISODateString, Trend } from "../../types/common.types.js";

export type ReputationSnapshot = {
  organizationId: ID;
  clientId: ID | null;
  rating: number;
  reviewCount: number;
  trend: Trend;
  source: string;
  checkedAt: ISODateString;
};
