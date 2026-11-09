import type { BookingStatus } from "../models/Booking.js";
import type { ID, ISODateString } from "./common.types.js";

export type BookingPublic = {
  id: ID;
  name: string;
  email: string;
  company: string;
  dayKey: string;
  slotId: string;
  timezone: string;
  status: BookingStatus | string;
  notes: string;
  createdAt: ISODateString;
};

export type CreateBookingInput = {
  name: string;
  email: string;
  company?: string;
  dayKey: string;
  slotId: string;
  timezone?: string;
  notes?: string;
};

export type { BookingStatus };
