import type { PaginationMeta } from "./common.types.js";

/**
 * Standard API response envelopes used by Express handlers.
 */

export type ApiSuccess<TData = unknown> = {
  success: true;
  data: TData;
  message?: string;
  meta?: Record<string, unknown>;
};

export type ApiPaginated<TItem = unknown> = {
  success: true;
  data: TItem[];
  meta: PaginationMeta & Record<string, unknown>;
};

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "TOO_MANY_REQUESTS"
  | "NOT_IMPLEMENTED"
  | "INTERNAL_ERROR"
  | "UNKNOWN";

export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiErrorBody = {
  success: false;
  error: {
    code: ApiErrorCode | string;
    message: string;
    status: number;
    details?: ApiFieldError[];
    requestId?: string;
  };
};

export type ApiResponse<TData = unknown> = ApiSuccess<TData> | ApiErrorBody;
