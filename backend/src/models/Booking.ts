import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const BOOKING_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

const bookingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    company: { type: String, default: "", trim: true },
    dayKey: { type: String, required: true },
    slotId: { type: String, required: true },
    timezone: { type: String, default: "Africa/Lagos" },
    status: { type: String, enum: BOOKING_STATUSES, default: "CONFIRMED" },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

bookingSchema.index({ email: 1, dayKey: 1, slotId: 1 });

export type BookingDocument = InferSchemaType<typeof bookingSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Booking: Model<BookingDocument> =
  mongoose.models.Booking ??
  mongoose.model<BookingDocument>("Booking", bookingSchema);
