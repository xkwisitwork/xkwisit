import type { ID, ISODateString } from "../../types/common.types.js";

export type PortfolioSummary = {
  organizationId: ID;
  clientCount: number;
  activeProjects: number;
  totalRetainer: number;
  averageHealthScore: number;
  generatedAt: ISODateString;
};
