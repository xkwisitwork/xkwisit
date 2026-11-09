/**
 * Sort an array by a key (ascending). Does not mutate the original.
 */
export function sortBy<T>(
  items: T[],
  keyFn: (item: T) => string | number,
  direction: "asc" | "desc" = "asc",
): T[] {
  const sorted = [...items].sort((a, b) => {
    const av = keyFn(a);
    const bv = keyFn(b);
    if (av < bv) return -1;
    if (av > bv) return 1;
    return 0;
  });
  return direction === "desc" ? sorted.reverse() : sorted;
}
