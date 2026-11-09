import type { ApiError, ApiResponse, RequestOptions } from "@/types/api";

import { ApiRequestError, normalizeError } from "./errors";

/* ─── Configuration ───────────────────────────────────── */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

const DEFAULT_TIMEOUT_MS = 30_000;

/* ─── Query string builder ───────────────────────────── */

function buildQueryString(
  query?: Record<string, string | number | boolean | undefined | null>,
): string {
  if (!query) return "";

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));

      continue;
    }

    params.set(key, String(value));
  }

  const qs = params.toString();

  return qs ? `?${qs}` : "";
}

/* ─── Core request function ──────────────────────────── */

/**
 * The single HTTP entry point for all frontend → backend calls.
 *
 * - Automatically prefixes `NEXT_PUBLIC_API_URL`.
 * - Attaches JSON headers when a body is present.
 * - Forwards cookies in the browser (`credentials: "include"`).
 * - Normalizes every failure into an `ApiRequestError`.
 * - Enforces a request timeout via `AbortController`.
 */
export async function apiClient<TData = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<TData> {
  const { method = "GET", headers = {}, body, query, signal, cache, next } = options;

  const url = `${API_URL}${path}${buildQueryString(query)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  // Compose the caller's signal with our timeout signal
  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };

  let requestBody: BodyInit | undefined;

  if (body !== undefined) {
    if (body instanceof FormData) {
      requestBody = body;
    } else {
      requestHeaders["Content-Type"] = "application/json";
      requestBody = JSON.stringify(body);
    }
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: requestBody,
      credentials: "include",
      signal: controller.signal,
      cache,
      next,
    });
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiRequestError({
        code: "NETWORK_ERROR",
        message: "The request took too long. Please try again.",
        status: 0,
      });
    }

    throw new ApiRequestError({
      code: "NETWORK_ERROR",
      message: "Please, check your internet connection and try again.",
      status: 0,
    });
  }

  clearTimeout(timeoutId);

  // 204 No Content
  if (response.status === 204) {
    return undefined as TData;
  }

  let payload: ApiResponse<TData> | ApiError | undefined;

  try {
    payload = (await response.json()) as ApiResponse<TData> | ApiError;
  } catch {
    // Response wasn't JSON
    if (!response.ok) {
      throw new ApiRequestError({
        code: "INTERNAL_ERROR",
        message: `Server returned ${response.status}.`,
        status: response.status,
      });
    }

    return undefined as TData;
  }

  if (!response.ok || (payload && "error" in payload && payload.success === false)) {
    const errorPayload =
      payload && "error" in payload && payload.success === false
        ? payload.error
        : {
            code: "UNKNOWN" as const,
            message: `Request failed with status ${response.status}.`,
            status: response.status,
          };

    throw new ApiRequestError(errorPayload);
  }

  if (payload && "success" in payload && payload.success === true) {
    return payload.data;
  }

  return payload as TData;
}

/* ─── Convenience verbs ──────────────────────────────── */

export function apiGet<TData = unknown>(
  path: string,
  options: Omit<RequestOptions, "method" | "body"> = {},
): Promise<TData> {
  return apiClient<TData>(path, { ...options, method: "GET" });
}

export function apiPost<TData = unknown, TBody = unknown>(
  path: string,
  body?: TBody,
  options: Omit<RequestOptions, "method" | "body"> = {},
): Promise<TData> {
  return apiClient<TData>(path, { ...options, method: "POST", body });
}

export function apiPut<TData = unknown, TBody = unknown>(
  path: string,
  body?: TBody,
  options: Omit<RequestOptions, "method" | "body"> = {},
): Promise<TData> {
  return apiClient<TData>(path, { ...options, method: "PUT", body });
}

export function apiPatch<TData = unknown, TBody = unknown>(
  path: string,
  body?: TBody,
  options: Omit<RequestOptions, "method" | "body"> = {},
): Promise<TData> {
  return apiClient<TData>(path, { ...options, method: "PATCH", body });
}

export function apiDelete<TData = unknown>(
  path: string,
  options: Omit<RequestOptions, "method" | "body"> = {},
): Promise<TData> {
  return apiClient<TData>(path, { ...options, method: "DELETE" });
}

/**
 * Server-side convenience wrapper.
 * Requires a Bearer token rather than cookies when called outside the browser.
 */
export async function apiServer<TData = unknown>(
  path: string,
  options: RequestOptions & { token?: string } = {},
): Promise<TData> {
  const { token, headers = {}, ...rest } = options;

  const authHeaders = token ? { ...headers, Authorization: `Bearer ${token}` } : headers;

  return apiClient<TData>(path, { ...rest, headers: authHeaders });
}

export { normalizeError };
