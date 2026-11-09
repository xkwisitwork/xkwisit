import type { ID, ISODateString, Money } from "@/types/common";
import type { LeadStatus } from "@/lib/constants/statuses";

/**
 * Sales pipeline board - opportunities staged by lead/deal status.
 */

export type PipelineStageId = LeadStatus;

export type PipelineCardPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type PipelineCardData = {
  id: ID;
  title: string;
  company: string;
  contactName: string | null;
  stage: PipelineStageId;
  value: Money;
  probability: number;
  ownerId: ID | null;
  ownerName: string | null;
  leadId: ID | null;
  opportunityId: ID | null;
  nextFollowUpAt: ISODateString | null;
  daysInStage: number;
  priority: PipelineCardPriority;
  tags: string[];
  updatedAt: ISODateString;
};

export type PipelineColumnData = {
  stage: PipelineStageId;
  label: string;
  cards: PipelineCardData[];
  totalValue: Money;
  weightedValue: Money;
};

export type PipelineBoardData = {
  columns: PipelineColumnData[];
  currency: Money["currency"];
  updatedAt: ISODateString;
};

export type PipelineFilterState = {
  search: string;
  ownerId: string | null;
  stages: PipelineStageId[];
  minValue: number | null;
  maxValue: number | null;
  priority: PipelineCardPriority | null;
};

export const emptyPipelineFilters: PipelineFilterState = {
  search: "",
  ownerId: null,
  stages: [],
  minValue: null,
  maxValue: null,
  priority: null,
};

export type PipelineSummary = {
  openDeals: number;
  totalPipeline: Money;
  weightedPipeline: Money;
  avgDealSize: Money;
  winRate: number;
  avgDaysToClose: number;
  closingThisMonth: number;
};

export type PipelineForecastPoint = {
  month: string;
  committed: number;
  bestCase: number;
  pipeline: number;
  closed: number;
};

export type PipelineForecastData = {
  currency: Money["currency"];
  points: PipelineForecastPoint[];
  summary: PipelineSummary;
};

export type MovePipelineCardPayload = {
  cardId: ID;
  fromStage: PipelineStageId;
  toStage: PipelineStageId;
  index?: number;
};

/** Ordered stages shown on the board (exclude terminal LOST by default). */
export const PIPELINE_BOARD_STAGES: PipelineStageId[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "DISCOVERY",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
];
