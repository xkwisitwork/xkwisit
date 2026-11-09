import { Booking, type BookingDocument } from "../../models/Booking.js";
import type {
  BookingPublic,
  CreateBookingInput,
} from "../../types/booking.types.js";
import { notFound } from "../../utils/errors.js";

function toBooking(doc: BookingDocument): BookingPublic {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    company: doc.company ?? "",
    dayKey: doc.dayKey,
    slotId: doc.slotId,
    timezone: doc.timezone ?? "Africa/Lagos",
    status: doc.status,
    notes: doc.notes ?? "",
    createdAt:
      (doc as { createdAt?: Date }).createdAt?.toISOString?.() ??
      new Date().toISOString(),
  };
}

export async function createBooking(input: CreateBookingInput) {
  const doc = await Booking.create({
    name: input.name.trim(),
    email: input.email.toLowerCase().trim(),
    company: input.company?.trim() ?? "",
    dayKey: input.dayKey,
    slotId: input.slotId,
    timezone: input.timezone ?? "Africa/Lagos",
    status: "CONFIRMED",
    notes: input.notes ?? "",
  });

  console.log(
    `[booking] strategy call booked: ${doc.email} ${doc.dayKey} ${doc.slotId}`,
  );

  return toBooking(doc);
}

export async function getBookingById(id: string) {
  const doc = await Booking.findById(id);
  if (!doc) throw notFound("Booking not found");
  return toBooking(doc);
}
