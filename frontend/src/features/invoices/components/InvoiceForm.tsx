"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { createInvoice } from "../api/invoices.api";
import type { CreateInvoicePayload, InvoiceCurrency } from "../types";

type LineDraft = {
  description: string;
  quantity: number;
  unitAmount: number;
  taxRate: number;
};

const emptyLine = (): LineDraft => ({
  description: "",
  quantity: 1,
  unitAmount: 0,
  taxRate: 7.5,
});

export function InvoiceForm() {
  const router = useRouter();
  const [clientId, setClientId] = useState("");
  const [currency, setCurrency] = useState<InvoiceCurrency>("NGN");
  const [notes, setNotes] = useState("");
  const [lines, setLines] = useState<LineDraft[]>([emptyLine()]);
  const [saving, setSaving] = useState(false);

  const updateLine = (index: number, patch: Partial<LineDraft>) => {
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, ...patch } : line)),
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId.trim()) {
      toast.error("Client ID is required");
      return;
    }
    setSaving(true);
    try {
      const payload: CreateInvoicePayload = {
        clientId: clientId.trim(),
        currency,
        notes: notes || null,
        lineItems: lines
          .filter((l) => l.description.trim())
          .map((l) => ({
            description: l.description.trim(),
            quantity: l.quantity,
            unitAmount: l.unitAmount,
            taxRate: l.taxRate,
          })),
      };
      const invoice = await createInvoice(payload);
      toast.success("Invoice created");
      router.push(`/finance/invoices/${invoice.id}`);
    } catch {
      toast.error("Could not create invoice");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoice details</CardTitle>
          <CardDescription>
            Draft a client invoice. Line items can be refined after create.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 tablet:grid-cols-2">
          <label className="space-y-1.5 text-300">
            <span className="font-medium text-neutral-700">Client ID</span>
            <Input
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="client_…"
              required
            />
          </label>
          <label className="space-y-1.5 text-300">
            <span className="font-medium text-neutral-700">Currency</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as InvoiceCurrency)}
              className="h-10 w-full rounded-lg border border-neutral-400 bg-white px-3"
            >
              {(["NGN", "USD", "GBP", "EUR"] as const).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1.5 text-300 tablet:col-span-2">
            <span className="font-medium text-neutral-700">Notes</span>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Payment terms, PO number…"
            />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Line items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {lines.map((line, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-xl border border-neutral-300 p-3 tablet:grid-cols-4"
            >
              <Input
                value={line.description}
                onChange={(e) => updateLine(index, { description: e.target.value })}
                placeholder="Description"
                className="tablet:col-span-2"
              />
              <Input
                type="number"
                min={0}
                step="1"
                value={line.quantity}
                onChange={(e) => updateLine(index, { quantity: Number(e.target.value) })}
                placeholder="Qty"
              />
              <Input
                type="number"
                min={0}
                step="0.01"
                value={line.unitAmount}
                onChange={(e) =>
                  updateLine(index, { unitAmount: Number(e.target.value) })
                }
                placeholder="Unit amount"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outlined"
            size="sm"
            onClick={() => setLines((prev) => [...prev, emptyLine()])}
          >
            Add line
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/finance/invoices")}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" loading={saving}>
          Create invoice
        </Button>
      </div>
    </form>
  );
}
