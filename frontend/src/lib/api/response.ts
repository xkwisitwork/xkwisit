import { NextResponse } from "next/server";

import { normalizeError } from "./errors";
import type { ApiSuccess } from "@/types/api";

/**
 * Standard success envelope for route handlers.
 */
export function ok<TData>(data: TData, message?: string, status = 200) {
  const body: ApiSuccess<TData> = {
    success: true,
    data,
    ...(message ? { message } : {}),
  };

  return NextResponse.json(body, { status });
}

/**
 * Standard created envelope (201).
 */
export function created<TData>(data: TData, message?: string) {
  return ok(data, message, 201);
}

/**
 * Standard error envelope.
 * Normalizes any thrown value into a consistent API error shape.
 */
export function fail(error: unknown) {
  const normalized = normalizeError(error);

  return NextResponse.json(
    {
      success: false,
      error: {
        code: normalized.code,
        message: normalized.message,
        status: normalized.status,
        details: normalized.details,
        requestId: normalized.requestId,
      },
    },
    { status: normalized.status || 500 },
  );
}
