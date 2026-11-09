import type { ID, ISODateString, Trend } from "../../types/common.types.js";

export type ChurnRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type ChurnSignal = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  riskLevel: ChurnRiskLevel;
  score: number;
  reasons: string[];
  trend: Trend;
  detectedAt: ISODateString;
};
