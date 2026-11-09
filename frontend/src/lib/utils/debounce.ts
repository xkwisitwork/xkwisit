/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  waitMs = 300,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, waitMs);
  };
}
