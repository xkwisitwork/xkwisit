"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";

export type DataTableItem = {
  id: string;
  primary: string;
  secondary?: string;
  status?: string;
  meta?: string;
  href?: string;
};

export type DataTableProps = {
  items?: DataTableItem[];
  className?: string;
  emptyMessage?: string;
};

const DEFAULT_ITEMS: DataTableItem[] = [];

export function DataTable({
  items = [],
  className,
  emptyMessage = "No records yet",
}: DataTableProps) {
  if (items.length === 0) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-neutral-400 bg-neutral-100 p-10 text-center text-400 text-neutral-600",
          className,
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100",
        className,
      )}
    >
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Name</TableHead>
            <TableHead>Detail</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="border-b border-neutral-300 last:border-0">
              <TableCell>
                {item.href ? (
                  <Link href={item.href} className="font-medium hover:text-primary">
                    {item.primary}
                  </Link>
                ) : (
                  <span className="font-medium">{item.primary}</span>
                )}
              </TableCell>
              <TableCell className="text-neutral-600">{item.secondary ?? "-"}</TableCell>
              <TableCell>
                {item.status ? (
                  <Badge variant="muted" size="sm">
                    {item.status}
                  </Badge>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-300 text-neutral-600">
                {item.meta ?? "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
