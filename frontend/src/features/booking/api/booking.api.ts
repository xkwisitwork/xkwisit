import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

export type CreateBookingPayload = {
  name: string;
  email: string;
  company?: string;
  dayKey: string;
  slotId: string;
  timezone?: string;
};

export type Booking = {
  id: string;
  name: string;
  email: string;
  company: string;
  dayKey: string;
  slotId: string;
  timezone: string;
  status: string;
  createdAt: string;
};

export async function createBooking(payload: CreateBookingPayload): Promise<Booking> {
  return apiClient<Booking>(endpoints.bookings.create, {
    method: "POST",
    body: payload,
  });
}

export async function getBooking(id: string): Promise<Booking> {
  return apiClient<Booking>(endpoints.bookings.detail(id), {
    method: "GET",
  });
}
