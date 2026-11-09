import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const sheetDownloadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    asset: {
      type: String,
      default: "XKWISIT_BUSINESS_GROWTH_STRATEGY.pdf",
      trim: true,
    },
    source: { type: String, default: "monday-sheet", trim: true },
  },
  { timestamps: true },
);

sheetDownloadSchema.index({ createdAt: -1 });

export type SheetDownloadDocument = InferSchemaType<typeof sheetDownloadSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const SheetDownload: Model<SheetDownloadDocument> =
  mongoose.models.SheetDownload ??
  mongoose.model<SheetDownloadDocument>("SheetDownload", sheetDownloadSchema);
