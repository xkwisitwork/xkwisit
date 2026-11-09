"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { useDebounce } from "@/hooks/useDebounce";
import {
  PROJECT_STATUSES,
  PROJECT_STATUS_LABELS,
  type ProjectStatus,
} from "@/lib/constants/statuses";

import type { ProjectFilterState } from "../types";

export type ProjectFiltersProps = {
  filters: ProjectFilterState;
  activeCount: number;
  onUpdate: <K extends keyof ProjectFilterState>(
    key: K,
    value: ProjectFilterState[K],
  ) => void;
  onReset: () => void;
};

export function ProjectFilters({
  filters,
  activeCount,
  onUpdate,
  onReset,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="min-w-[220px] max-w-md flex-1">
        <SearchInput value={filters.search} onChange={(v) => onUpdate("search", v)} />
      </div>

      <MultiSelectPopover
        label="Status"
        selected={filters.statuses}
        options={Object.values(PROJECT_STATUSES).map((status) => ({
          value: status,
          label: PROJECT_STATUS_LABELS[status as ProjectStatus],
        }))}
        onChange={(values) => onUpdate("statuses", values as ProjectStatus[])}
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
      placeholder="Search projects…"
      leftIcon={<Search />}
      value={local}
      onChange={(e) => setLocal(e.target.value)}
    />
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
