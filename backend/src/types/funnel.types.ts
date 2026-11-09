import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type FunnelStage = {
  id: string;
  label: string;
  count: number;
  conversionFromPrevious: number | null;
};

export type FunnelSnapshot = {
  organizationId: ID;
  clientId: ID | null;
  stages: FunnelStage[];
  generatedAt: ISODateString;
};
