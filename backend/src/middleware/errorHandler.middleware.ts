import type { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/errors.js";

export function notFoundMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new AppError("Route not found", 404, "NOT_FOUND"));
}

export function errorHandlerMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const appErr =
    err instanceof AppError
      ? err
      : new AppError(
          err instanceof Error ? err.message : "Internal server error",
          500,
          "INTERNAL_ERROR",
        );

  if (appErr.status >= 500) {
    console.error(`[error] ${req.method} ${req.path}`, err);
  }

  res.status(appErr.status).json({
    success: false,
    error: {
      code: appErr.code,
      message: appErr.message,
      status: appErr.status,
      details: appErr.details,
      requestId: req.requestId,
    },
  });
}
