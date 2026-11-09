"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { IconButton } from "@/components/ui/Button";
import type { PaginationMeta } from "@/types/common";

export function ApprovalPagination({
  meta,
  onPageChange,
}: {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  const { page, pageSize, total, totalPages, hasNext, hasPrev } = meta;
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-300 text-neutral-600">
        Showing <span className="font-medium">{from}</span>–
        <span className="font-medium">{to}</span> of{" "}
        <span className="font-medium">{total}</span>
      </p>
      <div className="flex items-center gap-2">
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
