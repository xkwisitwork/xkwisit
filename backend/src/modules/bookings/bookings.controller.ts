import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import * as bookingsService from "./bookings.service.js";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const booking = await bookingsService.createBooking(req.body);
  return sendSuccess(res, booking, 201, "Booking confirmed");
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const booking = await bookingsService.getBookingById(req.params.id as string);
  return sendSuccess(res, booking);
});
