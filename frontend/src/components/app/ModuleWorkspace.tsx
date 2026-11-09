"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, X } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardStat } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/lib/utils/cn";

export type ModuleStat = {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "success" | "warning" | "info" | "muted";
};

export type ModuleColumn = {
  key: string;
  label: string;
  align?: "left" | "right";
};

export type ModuleRow = Record<string, string | number | null | undefined> & {
  id: string;
  href?: string;
};

export type ModuleWorkspaceProps = {
  title: string;
  description: string;
  crumbs?: string[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  stats?: ModuleStat[];
  columns: ModuleColumn[];
  rows: ModuleRow[];
  filters?: string[];
  searchPlaceholder?: string;
};

const toneVariant: Record<
  NonNullable<ModuleStat["tone"]>,
  "default" | "success" | "warning" | "info" | "muted"
> = {
  default: "default",
  success: "success",
  warning: "warning",
  info: "info",
  muted: "muted",
};

/**
 * Full module shell for list workspaces.
 * Callers must pass live `rows` / `stats` — never invent demo records here.
 */
export function ModuleWorkspace({
  title,
  description,
  crumbs,
  primaryHref,
  primaryLabel = "Create new",
  secondaryHref,
  secondaryLabel,
  stats = [],
  columns,
  rows,
  filters = [],
  searchPlaceholder = "Search…",
}: ModuleWorkspaceProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const hay = Object.values(row)
        .filter((v) => v != null)
        .join(" ")
        .toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (activeFilter) {
        const statusLike = String(
          row.status ?? row.state ?? row.type ?? row.stage ?? "",
        ).toLowerCase();
        if (!statusLike.includes(activeFilter.toLowerCase())) return false;
      }
      return true;
    });
  }, [rows, query, activeFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={
          crumbs?.length ? (
            <p className="text-300 text-neutral-600">{crumbs.join(" / ")}</p>
          ) : undefined
        }
        actions={
          <>
            {secondaryHref && secondaryLabel ? (
              <Button variant="outlined" asChild>
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            ) : null}
            {primaryHref ? (
              <Button variant="contained" leftIcon={<Plus className="h-4 w-4" />} asChild>
                <Link href={primaryHref}>{primaryLabel}</Link>
              </Button>
            ) : null}
          </>
        }
      />

      {stats.length > 0 ? (
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardStat
                label={stat.label}
                value={stat.value}
                delta={
                  stat.hint ? (
                    <Badge variant={toneVariant[stat.tone ?? "muted"]} size="sm">
                      {stat.hint}
                    </Badge>
                  ) : undefined
                }
              />
            </Card>
          ))}
        </div>
      ) : null}

      <div className="space-y-3 rounded-2xl border border-neutral-400 bg-neutral-100 p-4">
        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9"
            />
          </div>
          {(query || activeFilter) && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<X className="h-4 w-4" />}
              onClick={() => {
                setQuery("");
                setActiveFilter(null);
              }}
            >
              Clear
            </Button>
          )}
        </div>
        {filters.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter((prev) => (prev === filter ? null : filter))
                  }
                  className={cn(
                    "rounded-full px-3 py-1 text-300",
                    active
                      ? "bg-mint text-white"
                      : "bg-white text-neutral-700 ring-1 ring-neutral-400",
                  )}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
          <p className="font-display text-600 leading-tight">
            No {title.toLowerCase()} match
          </p>
          <p className="mx-auto mt-2 max-w-sm text-400 text-neutral-600">
            Try another search or clear filters to see all records.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={col.align === "right" ? "text-right" : undefined}
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-neutral-300 last:border-0"
                >
                  {columns.map((col, index) => {
                    const value = row[col.key];
                    const content = value == null || value === "" ? "-" : String(value);
                    const isPrimary = index === 0 && row.href;
                    return (
                      <TableCell
                        key={col.key}
                        className={
                          col.align === "right" ? "text-right tabular-nums" : undefined
                        }
                      >
                        {isPrimary ? (
                          <Link
                            href={row.href!}
                            className="font-medium text-neutral-900 hover:text-primary"
                          >
                            {content}
                          </Link>
                        ) : col.key === "status" || col.key === "state" ? (
                          <Badge variant="muted" size="sm">
                            {content}
                          </Badge>
                        ) : (
                          <span className="text-400 text-neutral-700">{content}</span>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <p className="text-center text-300 text-neutral-600">
        Showing {filtered.length} of {rows.length} records
      </p>
    </div>
  );
}
