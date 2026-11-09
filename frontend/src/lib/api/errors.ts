import type { ApiError, ApiErrorCode, ApiFieldError } from "@/types/api";

/**
 * Custom error class for API failures.
 * Wraps the standard `ApiError` envelope into a throwable object so
 * TanStack Query and error boundaries can handle it uniformly.
 */
export class ApiRequestError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number;
  readonly details: ApiFieldError[];
  readonly requestId?: string;

  constructor(payload: ApiError["error"]) {
    super(payload.message);

    this.name = "ApiRequestError";
    this.code = payload.code;
    this.status = payload.status;
    this.details = payload.details ?? [];
    this.requestId = payload.requestId;
  }

  /** True when the failure is due to missing or invalid authentication. */
  get isUnauthorized(): boolean {
    return this.status === 401 || this.code === "UNAUTHORIZED";
  }

  /** True when the user is authenticated but lacks permission. */
  get isForbidden(): boolean {
    return this.status === 403 || this.code === "FORBIDDEN";
  }

  /** True when the resource does not exist. */
  get isNotFound(): boolean {
    return this.status === 404 || this.code === "NOT_FOUND";
  }

  /** True when the request was malformed. */
  get isValidationError(): boolean {
    return this.code === "VALIDATION_ERROR" || this.status === 422;
  }

  /** True when the client was rate-limited. */
  get isRateLimited(): boolean {
    return this.status === 429 || this.code === "RATE_LIMITED";
  }

  /** True when the failure is likely transient and safe to retry. */
  get isRetryable(): boolean {
    return this.status >= 500 || this.code === "NETWORK_ERROR";
  }

  /** Field-level errors keyed by field name. */
  get fieldErrors(): Record<string, string> {
    return this.details.reduce<Record<string, string>>((acc, item) => {
      acc[item.field] = item.message;

      return acc;
    }, {});
  }
}

/**
 * Normalizes any thrown value into an `ApiRequestError`.
 * Handles fetch failures, malformed payloads, and unexpected errors.
 */
export function normalizeError(input: unknown): ApiRequestError {
  if (input instanceof ApiRequestError) return input;

  if (input instanceof Error) {
    return new ApiRequestError({
      code: "UNKNOWN",
      message: input.message || "An unexpected error occurred.",
      status: 0,
    });
  }

  if (typeof input === "string") {
    return new ApiRequestError({
      code: "UNKNOWN",
      message: input,
      status: 0,
    });
  }

  return new ApiRequestError({
    code: "UNKNOWN",
    message: "An unexpected error occurred.",
    status: 0,
  });
}

/**
 * Returns a user-friendly message for any error.
 */
export function getErrorMessage(input: unknown): string {
  const error = normalizeError(input);

  if (error.isUnauthorized) return "You need to sign in to continue.";
  if (error.isForbidden) return "You don't have permission to do that.";
  if (error.isNotFound) return "We couldn't find that resource.";
  if (error.isRateLimited) return "Too many requests. Please slow down.";

  return error.message;
}
