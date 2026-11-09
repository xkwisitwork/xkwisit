"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
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

import type { Invoice } from "../types";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";

export function InvoicePreview({ invoice }: { invoice: Invoice }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>{invoice.number}</CardTitle>
              <CardDescription>
                {invoice.clientName} · Issued{" "}
                {formatDate(invoice.issueDate, "d MMM yyyy")}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <InvoiceStatusBadge status={invoice.status} size="md" />
              <PaymentStatusBadge status={invoice.paymentStatus} size="md" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 tablet:grid-cols-3">
          <div>
            <p className="text-200 uppercase tracking-wide text-neutral-600">Due date</p>
            <p className="mt-1 text-400 font-medium">
              {formatDate(invoice.dueDate, "d MMM yyyy")}
            </p>
          </div>
          <div>
            <p className="text-200 uppercase tracking-wide text-neutral-600">
              Amount due
            </p>
            <p className="mt-1 text-400 font-medium tabular-nums">
              {formatCurrency(invoice.amountDue, {
                currency: invoice.currency,
              })}
            </p>
          </div>
          <div>
            <p className="text-200 uppercase tracking-wide text-neutral-600">Total</p>
            <p className="mt-1 text-400 font-medium tabular-nums">
              {formatCurrency(invoice.total, { currency: invoice.currency })}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-neutral-400 bg-neutral-200/60">
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Unit</TableHead>
              <TableHead className="text-right">Tax %</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.lineItems.map((line) => (
              <TableRow
                key={line.id}
                className="border-b border-neutral-300 last:border-0"
              >
                <TableCell>{line.description}</TableCell>
                <TableCell className="text-right tabular-nums">{line.quantity}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(line.unitAmount, {
                    currency: invoice.currency,
                  })}
                </TableCell>
                <TableCell className="text-right tabular-nums">{line.taxRate}%</TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  {formatCurrency(line.totalAmount, {
                    currency: invoice.currency,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="ml-auto max-w-xs space-y-2 rounded-2xl border border-neutral-400 bg-white p-4">
        <div className="flex justify-between text-300">
          <span>Subtotal</span>
          <span className="tabular-nums">
            {formatCurrency(invoice.subtotal, { currency: invoice.currency })}
          </span>
        </div>
        <div className="flex justify-between text-300">
          <span>Tax</span>
          <span className="tabular-nums">
            {formatCurrency(invoice.taxTotal, { currency: invoice.currency })}
          </span>
        </div>
        <div className="flex justify-between border-t border-neutral-300 pt-2 text-400 font-semibold">
          <span>Total</span>
          <span className="tabular-nums">
            {formatCurrency(invoice.total, { currency: invoice.currency })}
          </span>
        </div>
      </div>

      {invoice.notes ? (
        <p className="text-300 text-neutral-600">{invoice.notes}</p>
      ) : null}
    </div>
  );
}
