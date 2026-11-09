import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type StoredFile = {
  id: ID;
  organizationId: ID;
  uploaderId: ID | null;
  name: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  folder: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type UploadTarget = {
  uploadUrl: string;
  fileUrl: string;
  key: string;
  expiresAt: ISODateString;
};
