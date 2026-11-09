import type { Response } from "express";

import type { ApiSuccess } from "../types/api.types.js";

export function sendSuccess<T>(
  res: Response,
  data: T,
  status = 200,
  message?: string,
  meta?: Record<string, unknown>,
) {
  const body: ApiSuccess<T> = {
    success: true,
    data,
    ...(message ? { message } : {}),
    ...(meta ? { meta } : {}),
  };
  return res.status(status).json(body);
}

export function sendNoContent(res: Response) {
  return res.status(204).send();
}
