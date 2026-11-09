"use client";

import { useState } from "react";
import { FileText, Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { parseCsv, type CsvRow } from "@/lib/utils/csv";
import { LEAD_SOURCES } from "@/lib/constants/funnel-stages";

import { useImportLeads } from "../hooks/useLeadMutations";
import type { CreateLeadPayload } from "../types";

const REQUIRED_COLUMNS = [
  "firstName",
  "lastName",
  "email",
  "company",
  "industry",
] as const;

export type LeadImportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LeadImportDialog({ open, onOpenChange }: LeadImportDialogProps) {
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [defaultSource, setDefaultSource] = useState<string>("Website");
  const [skipDuplicates, setSkipDuplicates] = useState(true);

  const importMutation = useImportLeads();

  const handleFile = async (file: File) => {
    setParseError(null);

    const text = await file.text();
    const parsed = parseCsv(text);

    if (parsed.length === 0) {
      setParseError("The file appears to be empty.");
      return;
    }

    const missing = REQUIRED_COLUMNS.filter(
      (col) => !Object.keys(parsed[0] ?? {}).includes(col),
    );

    if (missing.length > 0) {
      setParseError(`Missing required columns: ${missing.join(", ")}`);
      return;
    }

    setRows(parsed);
  };

  const handleImport = async () => {
    const payload: CreateLeadPayload[] = rows.map((row) => ({
      firstName: row.firstName ?? "",
      lastName: row.lastName ?? "",
      email: row.email ?? "",
      phone: row.phone,
      company: row.company ?? "",
      website: row.website,
      jobTitle: row.jobTitle,
      industry: row.industry ?? "Other",
      source: (row.source as CreateLeadPayload["source"]) ?? (defaultSource as never),
      serviceInterest: row.serviceInterest,
      budgetRange: row.budgetRange,
      notes: row.notes,
      tags: (row.tags ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }));

    await importMutation.mutateAsync({
      rows: payload,
      source: defaultSource,
      skipDuplicates,
    });

    setRows([]);
    onOpenChange(false);
  };

  const handleReset = () => {
    setRows([]);
    setParseError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xl">
        <DialogHeader>
          <DialogTitle>Import leads from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV with at least these columns: {REQUIRED_COLUMNS.join(", ")}. Extra
            columns are ignored.
          </DialogDescription>
        </DialogHeader>

        {rows.length === 0 ? (
          <div className="space-y-4">
            <label
              htmlFor="lead-import-file"
              className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-400 bg-neutral-200/40 px-6 py-12 text-center transition-colors hover:border-primary hover:bg-primary/5"
            >
              <Upload className="h-8 w-8 text-primary" />
              <div>
                <p className="text-400 font-medium">Click to choose a CSV file</p>
                <p className="mt-1 text-300 text-neutral-600">
                  Up to 500 rows per import
                </p>
              </div>
              <input
                id="lead-import-file"
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) void handleFile(file);
                }}
              />
            </label>

            {parseError ? (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-300 text-destructive">
                {parseError}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="info" size="md">
                <FileText className="h-3 w-3" />
                {rows.length} row{rows.length === 1 ? "" : "s"} ready
              </Badge>

              <Button variant="text" size="sm" onClick={handleReset}>
                Choose a different file
              </Button>
            </div>

            <div className="grid gap-4 tablet:grid-cols-2">
              <div>
                <label
                  htmlFor="import-default-source"
                  className="mb-1.5 block text-300 font-medium"
                >
                  Default source
                </label>
                <select
                  id="import-default-source"
                  value={defaultSource}
                  onChange={(e) => setDefaultSource(e.target.value)}
                  className="h-11 w-full rounded-lg border border-neutral-400 bg-neutral-100 px-4 text-400"
                >
                  {LEAD_SOURCES.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex cursor-pointer items-center gap-3 self-end">
                <input
                  type="checkbox"
                  checked={skipDuplicates}
                  onChange={(e) => setSkipDuplicates(e.target.checked)}
                  className="h-4 w-4 accent-[#3D00B7]"
                />
                <span className="text-400">Skip rows with duplicate emails</span>
              </label>
            </div>

            <div className="max-h-72 overflow-auto rounded-xl border border-neutral-400">
              <Table>
                <TableHeader>
                  <TableRow className="bg-neutral-200/60">
                    {Object.keys(rows[0] ?? {}).map((column) => (
                      <TableHead key={column}>{column}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.slice(0, 20).map((row, rowIdx) => (
                    <TableRow key={rowIdx}>
                      {Object.values(row).map((value, colIdx) => (
                        <TableCell key={colIdx} className="whitespace-nowrap text-300">
                          {value || <span className="text-neutral-600"> - </span>}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {rows.length > 20 ? (
                <p className="border-t border-neutral-400 bg-neutral-200/40 px-4 py-2 text-200 text-neutral-600">
                  Showing first 20 of {rows.length} rows
                </p>
              ) : null}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outlined"
            onClick={() => onOpenChange(false)}
            disabled={importMutation.isPending}
          >
            Cancel
          </Button>

          {rows.length > 0 ? (
            <Button
              variant="contained"
              onClick={handleImport}
              loading={importMutation.isPending}
              loadingText="Importing…"
            >
              Import {rows.length} lead{rows.length === 1 ? "" : "s"}
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
