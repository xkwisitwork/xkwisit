"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatNumber } from "@/lib/utils/format";

import { useExplorer } from "../hooks/useAnalytics";

export function DataExplorer() {
  const [metric, setMetric] = useState("sessions");
  const [dimension, setDimension] = useState("source");
  const [submitted, setSubmitted] = useState({ metric: "sessions", dimension: "source" });
  const { data, isLoading, isFetching } = useExplorer(submitted);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data explorer</CardTitle>
        <CardDescription>Query a metric by dimension.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 tablet:grid-cols-3">
          <Input
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            placeholder="Metric"
          />
          <Input
            value={dimension}
            onChange={(e) => setDimension(e.target.value)}
            placeholder="Dimension"
          />
          <Button
            variant="contained"
            loading={isFetching}
            onClick={() => setSubmitted({ metric, dimension })}
          >
            Run
          </Button>
        </div>
        {isLoading ? (
          <Skeleton variant="rectangle" className="h-40 w-full" />
        ) : !data ? (
          <p className="text-300 text-neutral-600">Run a query to see results.</p>
        ) : data.rows.length === 0 ? (
          <p className="text-300 text-neutral-600">No rows returned.</p>
        ) : (
          <ul className="divide-y divide-neutral-300 rounded-xl border border-neutral-400">
            {data.rows.map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between px-4 py-3 text-300"
              >
                <span>{row.label}</span>
                <span className="font-medium tabular-nums">
                  {formatNumber(row.value)}
                </span>
              </li>
            ))}
            <li className="flex items-center justify-between bg-neutral-200/50 px-4 py-3 text-300 font-medium">
              <span>Total</span>
              <span className="tabular-nums">{formatNumber(data.total)}</span>
            </li>
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
