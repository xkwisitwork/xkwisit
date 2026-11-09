"use client";

import Link from "next/link";

import { TableSkeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { formatDate } from "@/lib/utils/date";

import type { OpportunityListItem } from "../types";
import { OpportunityStageBadge } from "./OpportunityStage";
import { OpportunityValue } from "./OpportunityValue";

export type OpportunityTableProps = {
  items: OpportunityListItem[];
  loading?: boolean;
  emptyState?: React.ReactNode;
};

export function OpportunityTable({ items, loading, emptyState }: OpportunityTableProps) {
  if (loading) return <TableSkeleton rows={6} />;
  if (!items.length) return <>{emptyState}</>;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400/60 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Opportunity</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Close date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link
                  href={`/crm/opportunities/${item.id}`}
                  className="font-semibold text-neutral-900 hover:text-mint"
                >
                  {item.name}
                </Link>
                <p className="text-300 text-neutral-600">{item.company}</p>
              </TableCell>
              <TableCell>
                <OpportunityStageBadge stage={item.stage} />
              </TableCell>
              <TableCell className="text-right">
                <OpportunityValue value={item.value} probability={item.probability} />
              </TableCell>
              <TableCell className="text-300 text-neutral-600">
                {item.ownerName ?? "-"}
              </TableCell>
              <TableCell className="text-300 text-neutral-600">
                {item.expectedCloseDate
                  ? formatDate(item.expectedCloseDate, "d MMM yyyy")
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
