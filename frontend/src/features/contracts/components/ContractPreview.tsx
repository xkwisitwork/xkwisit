"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";

import type { Contract } from "../types";
import { ContractStatusBadge } from "./ContractStatusBadge";

export function ContractPreview({
  contract,
  loading,
}: {
  contract?: Contract | null;
  loading?: boolean;
}) {
  if (loading || !contract) {
    return <Skeleton variant="rectangle" className="h-48 w-full" />;
  }

  return (
    <div className="space-y-4 rounded-2xl border border-neutral-400 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-600 font-medium">{contract.title}</h2>
          <p className="text-300 text-neutral-600">{contract.clientName}</p>
        </div>
        <ContractStatusBadge status={contract.status} />
      </div>
      <p className="text-500 font-medium tabular-nums">
        {formatCurrencyCompact(contract.valueAmount, contract.currency)}
      </p>
      <p className="text-300 text-neutral-600">
        {contract.startDate ? formatDate(contract.startDate, "d MMM yyyy") : "-"} →{" "}
        {contract.endDate ? formatDate(contract.endDate, "d MMM yyyy") : "-"}
      </p>
      <pre className="whitespace-pre-wrap text-300 text-neutral-700">
        {contract.body ?? "No contract body."}
      </pre>
    </div>
  );
}
