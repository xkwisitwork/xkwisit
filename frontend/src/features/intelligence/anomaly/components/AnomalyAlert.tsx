"use client";

import { StatusBadge } from "@/components/ui/Badge";

import type { AnomalyListItem } from "../../types";
import { anomalySeverityTone, formatDeltaPercent } from "../utils/detectAnomaly";

export function AnomalyAlert({ anomaly }: { anomaly: AnomalyListItem }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-400 bg-neutral-200/40 px-4 py-3">
      <div>
        <p className="text-400 font-medium">{anomaly.title}</p>
        <p className="text-200 text-neutral-600">{anomaly.metric}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-300 tabular-nums">
          {formatDeltaPercent(anomaly.deltaPercent)}
        </span>
        <StatusBadge tone={anomalySeverityTone(anomaly.severity)} size="sm">
          {anomaly.severity}
        </StatusBadge>
      </div>
    </div>
  );
}
