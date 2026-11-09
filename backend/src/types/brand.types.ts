import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type BrandAssetKind = "LOGO" | "COLOR" | "FONT" | "GUIDELINE" | "IMAGE" | "OTHER";

export type BrandKit = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  name: string;
  primaryColor: string | null;
  secondaryColor: string | null;
  fonts: string[];
  voiceNotes: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type BrandAsset = {
  id: ID;
  brandKitId: ID;
  kind: BrandAssetKind;
  name: string;
  url: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
};
