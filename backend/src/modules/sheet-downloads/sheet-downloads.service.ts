import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SheetDownload, type SheetDownloadDocument } from "../../models/SheetDownload.js";
import { notFound } from "../../utils/errors.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_FILENAME = "XKWISIT_BUSINESS_GROWTH_STRATEGY.pdf";
const PDF_PATH = path.resolve(
  __dirname,
  "../../../assets/downloads",
  PDF_FILENAME,
);

/** Download links stay valid for a day after the form is submitted. */
const DOWNLOAD_TTL_MS = 24 * 60 * 60 * 1000;

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
}) {
  const doc = await SheetDownload.create({
    name: input.name.trim(),
    email: input.email.toLowerCase().trim(),
    phone: input.phone.trim(),
    asset: PDF_FILENAME,
    source: "monday-sheet",
  });

  console.log(
    `[sheet-download] growth sheet claimed: ${doc.email} ${doc.phone}`,
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

  if (!existsSync(PDF_PATH)) {
    throw notFound("Sheet file is missing on the server.");
  }

  return {
    record: toSheetDownload(doc),
    filename: PDF_FILENAME,
    stream: createReadStream(PDF_PATH),
  };
}
