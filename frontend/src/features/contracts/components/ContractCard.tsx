"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";

import type { ContractListItem } from "../types";
import { ContractStatusBadge } from "./ContractStatusBadge";

export function ContractCard({ contract }: { contract: ContractListItem }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{contract.title}</CardTitle>
          <p className="mt-1 text-200 text-neutral-600">{contract.clientName}</p>
        </div>
        <ContractStatusBadge status={contract.status} />
      </CardHeader>
      <CardContent className="text-300">
        <p className="font-medium tabular-nums">
          {formatCurrencyCompact(contract.valueAmount, contract.currency)}
        </p>
        <p className="mt-1 text-200 text-neutral-600">
          Updated {formatDate(contract.updatedAt, "d MMM yyyy")}
        </p>
      </CardContent>
    </Card>
  );
}
