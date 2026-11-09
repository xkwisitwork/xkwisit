"use client";

import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import type { NapListing } from "../types";

export function NapConsistency({ listings }: { listings: NapListing[] }) {
  if (listings.length === 0) {
    return <p className="text-400 text-neutral-600">No NAP listings checked.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Directory</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.map((row) => (
            <TableRow key={row.id} className="border-b border-neutral-300 last:border-0">
              <TableCell className="font-medium">{row.directory}</TableCell>
              <TableCell>{row.name ?? "-"}</TableCell>
              <TableCell className="text-300">{row.address ?? "-"}</TableCell>
              <TableCell className="text-300">{row.phone ?? "-"}</TableCell>
              <TableCell>
                <Badge variant={row.isConsistent ? "success" : "destructive"} size="sm">
                  {row.isConsistent ? "Consistent" : "Mismatch"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
