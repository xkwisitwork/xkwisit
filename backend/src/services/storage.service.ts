import { randomToken } from "../utils/crypto.js";
import type { StoredFile, UploadTarget } from "../types/file.types.js";

const files = new Map<string, StoredFile>();

export const storageService = {
  async createUploadTarget(input: {
    organizationId: string;
    name: string;
    mimeType: string;
  }): Promise<UploadTarget> {
    const key = randomToken(16);
    return {
      uploadUrl: `/api/uploads/direct/${key}`,
      fileUrl: `/uploads/${key}/${encodeURIComponent(input.name)}`,
      key,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };
  },
  async saveMetadata(file: StoredFile): Promise<StoredFile> {
    files.set(file.id, file);
    return file;
  },
  async get(id: string): Promise<StoredFile | null> {
    return files.get(id) ?? null;
  },
};
