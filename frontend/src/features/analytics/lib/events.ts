import type { EventProperty } from "../types";

export const DEFAULT_EVENT_PROPERTIES: EventProperty[] = [
  { key: "page_path", type: "string", required: false },
  { key: "value", type: "number", required: false },
];

export function slugifyEventName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}
