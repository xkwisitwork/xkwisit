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

export type FileTableItem = {
  id: string;
  primary: string;
  secondary?: string;
  status?: string;
  meta?: string;
  href?: string;
};

export type FileTableProps = {
  items?: FileTableItem[];
  className?: string;
  emptyMessage?: string;
};

export function FileTable({
  items = [],
  className,
  emptyMessage = "No records yet",
}: FileTableProps) {
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
            <TableHead>Segment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="border-b border-neutral-300/80">
              <TableCell className="font-medium text-neutral-900">
                {item.href ? (
                  <Link href={item.href} className="hover:text-mint">
                    {item.primary}
                  </Link>
                ) : (
                  item.primary
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
              <TableCell className="text-right text-300 text-neutral-600">
                {item.meta ?? "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
