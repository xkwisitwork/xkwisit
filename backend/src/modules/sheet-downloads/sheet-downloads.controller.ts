import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import * as sheetDownloadsService from "./sheet-downloads.service.js";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const record = await sheetDownloadsService.createSheetDownload(req.body);
  return sendSuccess(res, record, 201, "Details saved. Download is ready.");
});

export const list = asyncHandler(async (_req: Request, res: Response) => {
  const records = await sheetDownloadsService.listSheetDownloads();
  return sendSuccess(res, records);
});

export const downloadFile = asyncHandler(async (req: Request, res: Response) => {
  const { filename, stream } = await sheetDownloadsService.getDownloadableSheet(
    req.params.id as string,
  );

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}"`,
  );
  res.setHeader("Cache-Control", "no-store");

  stream.on("error", (error) => {
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Could not stream the sheet.",
          status: 500,
        },
      });
    } else {
      res.destroy(error);
    }
  });

  stream.pipe(res);
});
