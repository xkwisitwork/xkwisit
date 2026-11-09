"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { APPROVAL_STATUSES, type ApprovalStatus } from "@/lib/constants/statuses";

import type { ApprovalFilterState, ApprovalResourceType } from "../types";
import { approvalResourceLabel, approvalStatusLabel } from "../utils/approvalLabels";

const RESOURCE_TYPES: ApprovalResourceType[] = [
  "CONTENT",
  "CREATIVE",
  "PROPOSAL",
  "CONTRACT",
  "BRAND_ASSET",
  "CAMPAIGN",
  "DELIVERABLE",
  "INVOICE",
  "OTHER",
];

export type ApprovalFiltersProps = {
  filters: ApprovalFilterState;
  activeCount: number;
  onUpdate: <K extends keyof ApprovalFilterState>(
    key: K,
    value: ApprovalFilterState[K],
  ) => void;
  onReset: () => void;
};

export function ApprovalFilters({
  filters,
  activeCount,
  onUpdate,
  onReset,
}: ApprovalFiltersProps) {
  const toggleStatus = (status: ApprovalStatus) => {
    const next = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    onUpdate("statuses", next);
  };

  const toggleType = (type: ApprovalResourceType) => {
    const next = filters.resourceTypes.includes(type)
      ? filters.resourceTypes.filter((t) => t !== type)
      : [...filters.resourceTypes, type];
    onUpdate("resourceTypes", next);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-400 bg-neutral-100 p-4">
      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
          <Input
            value={filters.search}
            onChange={(e) => onUpdate("search", e.target.value)}
            placeholder="Search approvals…"
            className="pl-9"
          />
        </div>
        {activeCount > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<X className="h-4 w-4" />}
            onClick={onReset}
          >
            Clear ({activeCount})
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(APPROVAL_STATUSES) as ApprovalStatus[]).map((status) => {
          const active = filters.statuses.includes(status);
          return (
            <button
              key={status}
              type="button"
              onClick={() => toggleStatus(status)}
              className={`rounded-full px-3 py-1 text-300 ${
                active
                  ? "bg-mint text-white"
                  : "bg-white text-neutral-700 ring-1 ring-neutral-400"
              }`}
            >
              {approvalStatusLabel(status)}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {RESOURCE_TYPES.map((type) => {
          const active = filters.resourceTypes.includes(type);
          return (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              className={`rounded-full px-3 py-1 text-300 ${
                active
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-700 ring-1 ring-neutral-400"
              }`}
            >
              {approvalResourceLabel(type)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
