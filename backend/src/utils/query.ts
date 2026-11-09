export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildTextSearchFilter(
  fields: string[],
  search: string | undefined | null,
): Record<string, unknown> | undefined {
  const q = search?.trim();
  if (!q || fields.length === 0) return undefined;
  const rx = new RegExp(escapeRegex(q), "i");
  return {
    $or: fields.map((field) => ({ [field]: rx })),
  };
}

export function omitUndefined<T extends Record<string, unknown>>(input: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) out[key] = value;
  }
  return out as Partial<T>;
}
