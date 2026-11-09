import type { ID, ISODateString } from "../../types/common.types.js";

export type GrowthGraphNode = {
  id: ID;
  label: string;
  kind: string;
  value: number | null;
};

export type GrowthGraphEdge = {
  fromId: ID;
  toId: ID;
  weight: number | null;
};

export type GrowthGraph = {
  organizationId: ID;
  clientId: ID | null;
  nodes: GrowthGraphNode[];
  edges: GrowthGraphEdge[];
  generatedAt: ISODateString;
};
