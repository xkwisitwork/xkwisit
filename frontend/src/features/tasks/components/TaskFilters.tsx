"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export type TaskFiltersProps = {
  className?: string;
  options?: string[];
  onChange?: (state: { query: string; option: string | null }) => void;
};

export function TaskFilters({
  className,
  options = ["All", "Active", "Paused", "Archived"],
  onChange,
}: TaskFiltersProps) {
  const [query, setQuery] = useState("");
  const [option, setOption] = useState<string | null>(null);

  const emit = (nextQuery: string, nextOption: string | null) => {
    onChange?.({ query: nextQuery, option: nextOption });
  };

  return (
    <div
      className={cn(
        "space-y-3 rounded-2xl border border-neutral-400 bg-neutral-100 p-4",
        className,
      )}
    >
      <div className="flex flex-col gap-3 tablet:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              emit(e.target.value, option);
            }}
            placeholder="Filter…"
            className="pl-9"
          />
        </div>
        {(query || option) && (
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<X className="h-4 w-4" />}
            onClick={() => {
              setQuery("");
              setOption(null);
              emit("", null);
            }}
          >
            Clear
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = option === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                const next = active ? null : opt;
                setOption(next);
                emit(query, next);
              }}
              className={cn(
                "rounded-full px-3 py-1 text-300",
                active
                  ? "bg-mint text-white"
                  : "bg-white text-neutral-700 ring-1 ring-neutral-400",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
