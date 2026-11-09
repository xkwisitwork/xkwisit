"use client";

import { useCallback, useState } from "react";

/**
 * Boolean state with a toggle helper.
 *
 * @example
 *   const [open, toggle, setOpen] = useToggle(false);
 */
export function useToggle(
  initial = false,
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, toggle, setValue];
}
