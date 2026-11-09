/**
 * Browser file download helpers.
 * All helpers are no-ops on the server.
 */

/**
 * Triggers a browser download for a string (CSV, JSON, plain text).
 */
export function downloadFile(
  content: string | Blob,
  filename: string,
  mimeType = "text/plain",
): void {
  if (typeof window === "undefined") return;

  const blob =
    content instanceof Blob
      ? content
      : new Blob([content], { type: `${mimeType};charset=utf-8;` });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Convenience wrapper for CSV downloads.
 */
export function downloadCsv(csv: string, filename: string): void {
  const stamped = filename.endsWith(".csv") ? filename : `${filename}.csv`;

  downloadFile(csv, stamped, "text/csv");
}

/**
 * Convenience wrapper for JSON downloads.
 */
export function downloadJson(data: unknown, filename: string): void {
  const stamped = filename.endsWith(".json") ? filename : `${filename}.json`;
  const serialized = JSON.stringify(data, null, 2);

  downloadFile(serialized, stamped, "application/json");
}
