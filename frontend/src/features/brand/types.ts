import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type BrandAssetType =
  | "LOGO"
  | "ICON"
  | "COLOR_PALETTE"
  | "FONT"
  | "IMAGE"
  | "TEMPLATE"
  | "DOCUMENT"
  | "OTHER";

export type BrandApprovalStatus =
  "PENDING" | "APPROVED" | "CHANGES_REQUESTED" | "REJECTED";

/* ─── Assets ─────────────────────────────────────────── */

export type BrandAsset = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  clientName: string;
  name: string;
  type: BrandAssetType;
  mimeType: string | null;
  url: string;
  thumbnailUrl: string | null;
  fileSizeBytes: number | null;
  version: number;
  tags: string[];
  uploadedById: ID | null;
  uploadedByName: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

/* ─── Guidelines ─────────────────────────────────────── */

export type BrandColor = {
  id: ID;
  name: string;
  hex: string;
  role: "PRIMARY" | "SECONDARY" | "ACCENT" | "NEUTRAL" | "OTHER";
  usage: string | null;
};

export type BrandTypeface = {
  id: ID;
  name: string;
  family: string;
  weight: string | null;
  role: "DISPLAY" | "HEADING" | "BODY" | "MONO" | "OTHER";
  usage: string | null;
};

export type BrandGuidelines = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  clientName: string;
  summary: string | null;
  voiceTone: string | null;
  doList: string[];
  dontList: string[];
  colors: BrandColor[];
  typefaces: BrandTypeface[];
  logoUsageNotes: string | null;
  updatedAt: ISODateString;
};

/* ─── Logo concepts ──────────────────────────────────── */

export type LogoConcept = {
  id: ID;
  clientId: ID;
  name: string;
  description: string | null;
  previewUrl: string;
  status: BrandApprovalStatus;
  version: number;
  createdAt: ISODateString;
};

/* ─── Approvals & revisions ──────────────────────────── */

export type BrandApproval = {
  id: ID;
  clientId: ID;
  clientName: string;
  assetId: ID | null;
  conceptId: ID | null;
  title: string;
  status: BrandApprovalStatus;
  requestedByName: string | null;
  reviewerName: string | null;
  comment: string | null;
  createdAt: ISODateString;
  resolvedAt: ISODateString | null;
};

export type BrandRevision = {
  id: ID;
  clientId: ID;
  assetId: ID | null;
  conceptId: ID | null;
  version: number;
  summary: string;
  authorName: string | null;
  previewUrl: string | null;
  createdAt: ISODateString;
};

/* ─── Filters ────────────────────────────────────────── */

export type BrandAssetFilters = {
  search: string;
  types: BrandAssetType[];
  clientId: string | null;
};

export const emptyBrandAssetFilters: BrandAssetFilters = {
  search: "",
  types: [],
  clientId: null,
};

/* ─── Payloads ───────────────────────────────────────── */

export type UploadBrandAssetPayload = {
  clientId: string;
  name: string;
  type: BrandAssetType;
  file: File;
  tags?: string[];
};

export type BrandApprovalAction = {
  comment?: string;
};

export type UpdateBrandGuidelinesPayload = Partial<
  Pick<
    BrandGuidelines,
    "summary" | "voiceTone" | "doList" | "dontList" | "logoUsageNotes"
  >
> & {
  colors?: BrandColor[];
  typefaces?: BrandTypeface[];
};

/* ─── Stats ──────────────────────────────────────────── */

export type BrandStats = {
  totalAssets: number;
  pendingApprovals: number;
  logoConcepts: number;
  guidelinesUpdatedAt: ISODateString | null;
};
