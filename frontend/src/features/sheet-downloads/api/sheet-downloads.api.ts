import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { BotShieldFields } from "@/lib/bot-shield/types";

export type SheetDownloadLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  asset: string;
  source: string;
  createdAt: string;
};

export type SheetDownloadAssetKey =
  | "growth-strategy"
  | "launch-brand-playbook"
  | "ecommerce-cro-blueprint";

export type CreateSheetDownloadPayload = {
  name: string;
  email: string;
  phone: string;
  assetKey?: SheetDownloadAssetKey;
} & BotShieldFields;

export async function createSheetDownload(
  payload: CreateSheetDownloadPayload,
): Promise<SheetDownloadLead> {
  return apiClient<SheetDownloadLead>(endpoints.sheetDownloads.create, {
    method: "POST",
    body: payload,
  });
}

export async function listSheetDownloads(
  token: string,
): Promise<SheetDownloadLead[]> {
  return apiClient<SheetDownloadLead[]>(endpoints.sheetDownloads.list, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function sheetDownloadFileUrl(id: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
  return `${base}${endpoints.sheetDownloads.file(id)}`;
}
