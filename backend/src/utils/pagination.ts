import type { PaginationMeta, PaginationParams } from "../types/common.types.js";

export function normalizePagination(
  input: Partial<PaginationParams> | undefined,
  defaults: PaginationParams = { page: 1, pageSize: 20 },
): PaginationParams {
  const page = Math.max(1, Number(input?.page) || defaults.page);
  const pageSize = Math.min(100, Math.max(1, Number(input?.pageSize) || defaults.pageSize));
  return { page, pageSize };
}

export function buildPaginationMeta(
  total: number,
  params: PaginationParams,
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / params.pageSize) || 1);
  return {
    page: params.page,
    pageSize: params.pageSize,
    total,
    totalPages,
    hasNext: params.page < totalPages,
    hasPrev: params.page > 1,
  };
}

export function paginationSkip(params: PaginationParams): number {
  return (params.page - 1) * params.pageSize;
}
