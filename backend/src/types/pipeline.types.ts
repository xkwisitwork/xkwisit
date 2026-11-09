import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type PipelineStage = {
  id: ID;
  name: string;
  order: number;
  probability: number;
};

export type PipelineBoard = {
  organizationId: ID;
  stages: PipelineStage[];
  cards: Array<{
    id: ID;
    stageId: ID;
    title: string;
    value: number | null;
    ownerName: string | null;
  }>;
};
