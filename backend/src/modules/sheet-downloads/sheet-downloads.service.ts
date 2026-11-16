import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SheetDownload, type SheetDownloadDocument } from "../../models/SheetDownload.js";
import { badRequest, notFound } from "../../utils/errors.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOWNLOADS_DIR = path.resolve(__dirname, "../../../assets/downloads");

/** Download links stay valid for a day after the form is submitted. */
const DOWNLOAD_TTL_MS = 24 * 60 * 60 * 1000;

const DOWNLOAD_ASSETS = {
  "growth-strategy": {
    filename: "XKWISIT_BUSINESS_GROWTH_STRATEGY.pdf",
    source: "monday-sheet",
  },
  "launch-brand-playbook": {
    filename: "XKWISIT_LAUNCH_BRAND_PLAYBOOK.pdf",
    source: "launch-brand-playbook",
  },
  "ecommerce-cro-blueprint": {
    filename: "XKWISIT_ECOMMERCE_CRO_BLUEPRINT.pdf",
    source: "ecommerce-cro-blueprint",
  },
} as const;

export type DownloadAssetKey = keyof typeof DOWNLOAD_ASSETS;

function toSheetDownload(doc: SheetDownloadDocument) {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    asset: doc.asset,
    source: doc.source,
    createdAt:
      (doc as { createdAt?: Date }).createdAt?.toISOString?.() ??
      new Date().toISOString(),
  };
}

export async function createSheetDownload(input: {
  name: string;
  email: string;
  phone: string;
  assetKey?: string;
}) {
  const key = (input.assetKey ?? "growth-strategy") as DownloadAssetKey;
  const asset = DOWNLOAD_ASSETS[key];
  if (!asset) {
    throw badRequest("Unknown download asset.");
  }

  const pdfPath = path.join(DOWNLOADS_DIR, asset.filename);
  if (!existsSync(pdfPath)) {
    throw notFound("Sheet file is missing on the server.");
  }

  const doc = await SheetDownload.create({
    name: input.name.trim(),
    email: input.email.toLowerCase().trim(),
    phone: input.phone.trim(),
    asset: asset.filename,
    source: asset.source,
  });

  console.log(
    `[sheet-download] ${asset.source} claimed: ${doc.email} ${doc.phone}`,
  );

  return toSheetDownload(doc);
}

export async function listSheetDownloads(limit = 200) {
  const docs = await SheetDownload.find()
    .sort({ createdAt: -1 })
    .limit(Math.min(Math.max(limit, 1), 500));

  return docs.map(toSheetDownload);
}

export async function countSheetDownloads() {
  return SheetDownload.countDocuments();
}

export async function getDownloadableSheet(id: string) {
  const doc = await SheetDownload.findById(id);
  if (!doc) throw notFound("Download not found");

  const createdAt =
    (doc as { createdAt?: Date }).createdAt?.getTime?.() ?? Date.now();
  if (Date.now() - createdAt > DOWNLOAD_TTL_MS) {
    throw notFound("Download link expired. Submit the form again.");
  }

  const filename = doc.asset || DOWNLOAD_ASSETS["growth-strategy"].filename;
  const pdfPath = path.join(DOWNLOADS_DIR, filename);
  if (!existsSync(pdfPath)) {
    throw notFound("Sheet file is missing on the server.");
  }

  return {
    record: toSheetDownload(doc),
    filename,
    stream: createReadStream(pdfPath),
  };
}
