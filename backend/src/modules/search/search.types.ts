import type { ID } from "../../types/common.types.js";

export type SearchResultKind =
  | "CLIENT"
  | "LEAD"
  | "PROJECT"
  | "TASK"
  | "INVOICE"
  | "USER"
  | "REPORT"
  | "OTHER";

export type SearchHit = {
  id: ID;
  kind: SearchResultKind;
  title: string;
  subtitle: string | null;
  href: string | null;
  score: number;
};

export type SearchResponse = {
  query: string;
  hits: SearchHit[];
  total: number;
};
