"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import type { PipelineForecastData } from "../types";
import { PipelineValueSummary } from "./PipelineValueSummary";

export type PipelineForecastProps = {
  forecast?: PipelineForecastData;
  loading?: boolean;
};

export function PipelineForecastView({ forecast, loading }: PipelineForecastProps) {
  if (loading || !forecast) {
    return <Skeleton variant="rectangle" className="h-96 w-full rounded-2xl" />;
  }

  const data = forecast.points.map((p) => ({
    month: p.month,
    Committed: p.committed,
    "Best case": p.bestCase,
    Pipeline: p.pipeline,
    Closed: p.closed,
  }));

  return (
    <div className="space-y-6">
      <PipelineValueSummary summary={forecast.summary} />

      <Card className="border-neutral-400/60 shadow-none">
        <CardHeader>
          <CardTitle>Revenue forecast</CardTitle>
          <CardDescription>
            Committed vs best-case vs open pipeline (₦ millions)
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="pipeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B05C4" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3B05C4" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="commitFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#0F766E" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  fontSize: 12,
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="Pipeline"
                stroke="#3B05C4"
                fill="url(#pipeFill)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Best case"
                stroke="#C4B2FF"
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="4 4"
              />
              <Area
                type="monotone"
                dataKey="Committed"
                stroke="#0F766E"
                fill="url(#commitFill)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Closed"
                stroke="#111827"
                fill="transparent"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export { PipelineForecastView as PipelineForecast };
