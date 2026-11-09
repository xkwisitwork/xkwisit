"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrencyCompact } from "@/lib/utils/currency";

export function PricingSection({
  totalAmount,
  currency,
  notes,
}: {
  totalAmount: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  notes: string | null;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-600 font-medium tabular-nums">
          {formatCurrencyCompact(totalAmount, currency)}
        </p>
        {notes ? <p className="text-300 text-neutral-600">{notes}</p> : null}
      </CardContent>
    </Card>
  );
}
