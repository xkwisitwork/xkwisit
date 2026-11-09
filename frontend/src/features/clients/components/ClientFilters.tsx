"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { useDebounce } from "@/hooks/useDebounce";

import type { ClientFilterState, ClientStatus, ClientTier } from "../types";

const STATUS_OPTIONS: { value: ClientStatus; label: string }[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "PAUSED", label: "Paused" },
  { value: "PROSPECT", label: "Prospect" },
  { value: "CHURNED", label: "Churned" },
  { value: "ARCHIVED", label: "Archived" },
];

const TIER_OPTIONS: { value: ClientTier; label: string }[] = [
  { value: "STANDARD", label: "Standard" },
  { value: "PREMIUM", label: "Premium" },
  { value: "ENTERPRISE", label: "Enterprise" },
];

export type ClientFiltersProps = {
  filters: ClientFilterState;
  activeCount: number;
  onUpdate: <K extends keyof ClientFilterState>(
    key: K,
    value: ClientFilterState[K],
  ) => void;
  onReset: () => void;
};

export function ClientFilters({
  filters,
  activeCount,
  onUpdate,
  onReset,
}: ClientFiltersProps) {
  const [localSearch, setLocalSearch] = React.useState(filters.search);
  const debounced = useDebounce(localSearch, 350);

  React.useEffect(() => {
    if (debounced !== filters.search) onUpdate("search", debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="min-w-[220px] max-w-md flex-1">
        <Input
          type="search"
          placeholder="Search clients…"
          leftIcon={<Search />}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <MultiSelectPopover
        label="Status"
        selected={filters.statuses}
        options={STATUS_OPTIONS}
        onChange={(values) => onUpdate("statuses", values as ClientStatus[])}
      />

      <MultiSelectPopover
        label="Tier"
        selected={filters.tiers}
        options={TIER_OPTIONS}
        onChange={(values) => onUpdate("tiers", values as ClientTier[])}
      />

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

      <PopoverContent align="start" className="w-64 p-3">
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
      </PopoverContent>
    </Popover>
  );
}

import * as React from "react";
