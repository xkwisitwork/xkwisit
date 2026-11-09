"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import type { StaleProspect } from "../types";

export function StaleProspectCard({ prospect }: { prospect: StaleProspect }) {
  return (
    <Link
      href={prospect.href}
      className="flex items-center gap-3 rounded-xl border border-warning/30 bg-warning/5 p-3 transition hover:border-warning/60"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-warning/15 text-warning">
        <AlertTriangle className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-neutral-900">{prospect.name}</p>
        <p className="truncate text-300 text-neutral-600">{prospect.company}</p>
      </div>
      <span className="text-200 font-semibold tabular-nums text-warning">
        {prospect.daysSilent}d silent
      </span>
    </Link>
  );
}

export function OverdueLeads({ items }: { items: StaleProspect[] }) {
  if (!items.length) {
    return (
      <p className="rounded-2xl border border-neutral-400/60 bg-white p-6 text-center text-300 text-neutral-600">
        No stale prospects - nice work.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((p) => (
        <StaleProspectCard key={p.id} prospect={p} />
      ))}
    </div>
  );
}
