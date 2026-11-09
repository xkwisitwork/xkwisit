"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { IconButton } from "@/components/ui/Button";
import type { PaginationMeta } from "@/types/common";

export type ClientPaginationProps = {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
};

export function ClientPagination({
  meta,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}: ClientPaginationProps) {
  const { page, pageSize, total, totalPages, hasNext, hasPrev } = meta;
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col items-center justify-between gap-4 tablet:flex-row">
      <p className="text-300 text-neutral-600">
        Showing <span className="font-medium">{from}</span>–
        <span className="font-medium">{to}</span> of{" "}
        <span className="font-medium">{total}</span>
      </p>

      <div className="flex items-center gap-2">
        {onPageSizeChange ? (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Rows per page"
            className="h-9 rounded-lg border border-neutral-400 bg-neutral-100 px-3 text-300"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        ) : null}

        <IconButton
          aria-label="Previous page"
          icon={<ChevronLeft className="h-4 w-4" />}
          variant="outlined"
          size="icon-sm"
          disabled={!hasPrev}
          onClick={() => onPageChange(page - 1)}
        />

        <span className="px-3 text-300 tabular-nums text-neutral-600">
          {page} / {Math.max(totalPages, 1)}
        </span>

        <IconButton
          aria-label="Next page"
          icon={<ChevronRight className="h-4 w-4" />}
          variant="outlined"
          size="icon-sm"
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
        />
      </div>
    </div>
  );
}
