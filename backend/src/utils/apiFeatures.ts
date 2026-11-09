import type { PaginationParams, SortDirection } from "../types/common.types.js";
import { normalizePagination, paginationSkip } from "./pagination.js";

export type ApiQueryInput = {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
};

export type ParsedApiQuery = {
  pagination: PaginationParams;
  skip: number;
  sort: Record<string, 1 | -1>;
  search: string | undefined;
};

/**
 * Parse common list-query params into mongoose-friendly options.
 * `sort` accepts `-createdAt` / `name` style strings.
 */
export function parseApiQuery(
  input: ApiQueryInput | undefined,
  defaults: { sort?: string; pageSize?: number } = {},
): ParsedApiQuery {
  const pagination = normalizePagination(input, {
    page: 1,
    pageSize: defaults.pageSize ?? 20,
  });
  const sortField = (input?.sort || defaults.sort || "-createdAt").trim();
  const direction: SortDirection = sortField.startsWith("-") ? "desc" : "asc";
  const field = sortField.replace(/^-/, "") || "createdAt";
  return {
    pagination,
    skip: paginationSkip(pagination),
    sort: { [field]: direction === "desc" ? -1 : 1 },
    search: input?.search?.trim() || undefined,
  };
}
