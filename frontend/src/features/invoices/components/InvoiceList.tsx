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
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";

import type { InvoiceListItem } from "../types";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";

export type InvoiceListProps = {
  items: InvoiceListItem[];
  loading?: boolean;
  emptyState?: React.ReactNode;
};

export function InvoiceList({ items, loading, emptyState }: InvoiceListProps) {
  if (loading) return <TableSkeleton rows={8} columns={7} />;
  if (items.length === 0) return <>{emptyState}</>;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Amount due</TableHead>
            <TableHead>Due date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((invoice) => (
            <TableRow
              key={invoice.id}
              className="border-b border-neutral-300 last:border-0"
            >
              <TableCell>
                <Link
                  href={`/finance/invoices/${invoice.id}`}
                  className="text-400 font-medium hover:text-primary"
                >
                  {invoice.number}
                </Link>
                <p className="mt-0.5 text-200 text-neutral-600">
                  Issued {formatDate(invoice.issueDate, "d MMM yyyy")}
                </p>
              </TableCell>
              <TableCell>
                <Link
                  href={`/clients/${invoice.clientId}`}
                  className="text-400 text-neutral-600 hover:text-primary"
                >
                  {invoice.clientName}
                </Link>
              </TableCell>
              <TableCell>
                <InvoiceStatusBadge status={invoice.status} />
              </TableCell>
              <TableCell>
                <PaymentStatusBadge status={invoice.paymentStatus} />
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(invoice.total, { currency: invoice.currency })}
              </TableCell>
              <TableCell className="text-right font-medium tabular-nums">
                {formatCurrency(invoice.amountDue, {
                  currency: invoice.currency,
                })}
              </TableCell>
              <TableCell>
                <span className="text-300 text-neutral-600">
                  {formatDate(invoice.dueDate, "d MMM yyyy")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
