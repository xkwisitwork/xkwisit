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
import { formatNumber, formatPercent } from "@/lib/utils/format";

import type { ExperimentVariant } from "../types";
import { findControl, liftVsControl } from "../utils/experimentStats";

export function VariantComparison({ variants }: { variants: ExperimentVariant[] }) {
  const control = findControl(variants);

  if (variants.length === 0) {
    return <p className="text-400 text-neutral-600">No variants.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Variant</TableHead>
            <TableHead className="text-right">Visitors</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">CVR</TableHead>
            <TableHead className="text-right">Lift</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant) => {
            const lift = liftVsControl(variant, control);
            return (
              <TableRow
                key={variant.id}
                className="border-b border-neutral-300 last:border-0"
              >
                <TableCell className="font-medium">
                  {variant.name}
                  {variant.isControl ? (
                    <Badge variant="muted" size="sm" className="ml-2">
                      Control
                    </Badge>
                  ) : null}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatNumber(variant.visitors)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatNumber(variant.conversions)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatPercent(variant.conversionRate)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {lift == null ? "-" : `${lift > 0 ? "+" : ""}${lift.toFixed(1)}%`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
