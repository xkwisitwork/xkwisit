"use client";

import { Search, X } from "lucide-react";

import { Button, IconButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";

import {
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  type LeadStatus,
} from "@/lib/constants/statuses";
import { LEAD_SOURCES, type LeadSource } from "@/lib/constants/funnel-stages";
import { useDebounce } from "@/hooks/useDebounce";

import type { LeadFilterState } from "../types";

export type LeadFiltersProps = {
  filters: LeadFilterState;
  activeCount: number;
  onUpdate: <K extends keyof LeadFilterState>(key: K, value: LeadFilterState[K]) => void;
  onReset: () => void;
};

export function LeadFilters({
  filters,
  activeCount,
  onUpdate,
  onReset,
}: LeadFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="min-w-[220px] max-w-md flex-1">
        <SearchInput
          value={filters.search}
          onChange={(value) => onUpdate("search", value)}
        />
      </div>

      {/* Status filter */}
      <MultiSelectPopover
        label="Status"
        selected={filters.statuses}
        options={Object.values(LEAD_STATUSES).map((status) => ({
          value: status,
          label: LEAD_STATUS_LABELS[status as LeadStatus],
        }))}
        onChange={(values) => onUpdate("statuses", values as LeadStatus[])}
      />

      {/* Source filter */}
      <MultiSelectPopover
        label="Source"
        selected={filters.sources}
        options={LEAD_SOURCES.map((source) => ({
          value: source,
          label: source,
        }))}
        onChange={(values) => onUpdate("sources", values as LeadSource[])}
      />

      {/* Reset */}
      {activeCount > 0 ? (
        <Button
          variant="text"
          size="sm"
          leftIcon={<X className="h-3.5 w-3.5" />}
          onClick={onReset}
        >
          Clear ({activeCount})
        </Button>
      ) : null}
    </div>
  );
}

/* ─── Search input with debounce ─────────────────────── */

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [local, setLocal] = React.useState(value);
  const debounced = useDebounce(local, 350);

  React.useEffect(() => {
    if (debounced !== value) onChange(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <Input
      type="search"
      placeholder="Search leads…"
      leftIcon={<Search />}
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      inputSize="md"
    />
  );
}

/* ─── Multi-select popover ───────────────────────────── */

function MultiSelectPopover({
  label,
  selected,
  options,
  onChange,
}: {
  label: string;
  selected: string[];
  options: { value: string; label: string }[];
  onChange: (values: string[]) => void;
}) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outlined" size="md">
          {label}
          {selected.length > 0 ? (
            <Badge variant="default" size="sm" className="ml-1">
              {selected.length}
            </Badge>
          ) : null}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-0">
        <div className="max-h-72 overflow-y-auto p-3">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-400 hover:bg-neutral-200"
            >
              <Checkbox
                checked={selected.includes(option.value)}
                onCheckedChange={() => toggle(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        {selected.length > 0 ? (
          <>
            <div className="border-t border-border" role="separator" />
            <div className="p-3">
              <Button variant="text" size="sm" fullWidth onClick={() => onChange([])}>
                Clear
              </Button>
            </div>
          </>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

/* ─── React import for SearchInput ───────────────────── */

import * as React from "react";
