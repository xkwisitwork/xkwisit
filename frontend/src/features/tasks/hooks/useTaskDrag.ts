"use client";

import { useCallback, useState } from "react";

/**
 * Drag-and-drop helpers for Tasks.
 */
export function useTaskDrag<T extends { id: string }>(initial: T[] = []) {
  const [items, setItems] = useState<T[]>(initial);

  const reorder = useCallback((fromIndex: number, toIndex: number) => {
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved) return prev;
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  return { items, setItems, reorder };
}
