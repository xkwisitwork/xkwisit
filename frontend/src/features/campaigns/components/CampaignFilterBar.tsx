"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { CAMPAIGN_STATUSES, type CampaignStatus } from "@/lib/constants/statuses";

import type { CampaignFilters as CampaignFilterState } from "../types";
import { campaignStatusLabel } from "../utils/metricsCalculator";

export type CampaignFilterBarProps = {
  filters: CampaignFilterState;
  activeCount: number;
  onUpdate: <K extends keyof CampaignFilterState>(
    key: K,
    value: CampaignFilterState[K],
  ) => void;
  onReset: () => void;
};

export function CampaignFilterBar({
  filters,
  activeCount,
  onUpdate,
  onReset,
}: CampaignFilterBarProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);
  const debounced = useDebounce(localSearch, 350);

  useEffect(() => {
    if (debounced !== filters.search) onUpdate("search", debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[220px] max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
        <Input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search campaigns…"
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {Object.values(CAMPAIGN_STATUSES).map((status) => {
          const active = filters.statuses.includes(status);
          return (
            <button
              key={status}
              type="button"
              onClick={() => {
                const next = active
                  ? filters.statuses.filter((s) => s !== status)
                  : [...filters.statuses, status];
                onUpdate("statuses", next);
              }}
              className={`rounded-full border px-3 py-1 text-300 transition ${
                active
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-neutral-400 text-neutral-600 hover:border-neutral-500"
              }`}
            >
              {campaignStatusLabel(status as CampaignStatus)}
            </button>
          );
        })}
      </div>

      {activeCount > 0 ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setLocalSearch("");
            onReset();
          }}
        >
          <X className="h-4 w-4" />
          Clear
          <Badge variant="muted" size="sm">
            {activeCount}
          </Badge>
        </Button>
      ) : null}
    </div>
  );
}
