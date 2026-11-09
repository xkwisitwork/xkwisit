import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";

export function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const started = Date.now();
  res.on("finish", () => {
    logger.info("http_request", {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - started,
      requestId: req.requestId,
    });
  });
  next();
}
