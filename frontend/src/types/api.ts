import type { PaginationMeta } from "./common";

/**
 * Standard API response shapes.
 * All backend responses conform to these envelopes.
 */

/* ─── Success ─────────────────────────────────────── */

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

/* ─── Error ───────────────────────────────────────── */

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN";

export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiError = {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
    status: number;
    details?: ApiFieldError[];
    requestId?: string;
  };
};

/* ─── Union ───────────────────────────────────────── */

export type ApiResponse<TData = unknown> = ApiSuccess<TData> | ApiError;

/* ─── Request helpers ─────────────────────────────── */

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
  signal?: AbortSignal;
  cache?: RequestCache;
  next?: { revalidate?: number | false; tags?: string[] };
};

export type UploadProgress = {
  loaded: number;
  total: number;
  percent: number;
};
