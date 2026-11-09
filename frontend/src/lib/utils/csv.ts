/**
 * CSV parsing and building utilities.
 * Lightweight, dependency-free - sufficient for import/export flows.
 */

export type CsvRow = Record<string, string>;

/* ─── Parsing ────────────────────────────────────────── */

/**
 * Parses CSV text into an array of row objects.
 * Handles quoted fields, escaped quotes, and CRLF/LF line endings.
 *
 * @example
 * const rows = parseCsv(text);
 * // [{ name: "Ada", email: "ada@example.com" }, ...]
 */
export function parseCsv(text: string, delimiter = ","): CsvRow[] {
  if (!text) return [];

  const lines = splitLines(text);
  if (lines.length < 2) return [];

  const headers = parseLine(lines[0]!, delimiter).map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = parseLine(line, delimiter);
    const row: CsvRow = {};

    headers.forEach((header, index) => {
      row[header] = (values[index] ?? "").trim();
    });

    return row;
  });
}

function splitLines(text: string): string[] {
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;

      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && text[i + 1] === "\n") i += 1;

      if (current.trim()) lines.push(current);
      current = "";

      continue;
    }

    current += char;
  }

  if (current.trim()) lines.push(current);

  return lines;
}

function parseLine(line: string, delimiter: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }

      continue;
    }

    if (char === delimiter && !inQuotes) {
      values.push(current);
      current = "";

      continue;
    }

    current += char;
  }

  values.push(current);

  return values;
}

/* ─── Building ───────────────────────────────────────── */

/**
 * Converts an array of objects into CSV text.
 * All values are stringified; quotes are escaped.
 */
export function buildCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns?: (keyof T)[],
): string {
  if (rows.length === 0) return "";

  const keys = columns ?? (Object.keys(rows[0]!) as (keyof T)[]);
  const header = keys.map((k) => escapeCell(String(k))).join(",");
  const body = rows
    .map((row) => keys.map((key) => escapeCell(stringifyCell(row[key]))).join(","))
    .join("\n");

  return `${header}\n${body}`;
}

function escapeCell(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

function stringifyCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value instanceof Date) return value.toISOString();

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
