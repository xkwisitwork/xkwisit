"use client";

import { useEffect } from "react";

export type Hotkey = {
  /** Key to match, e.g. "k", "Escape", "Enter" (case-insensitive). */
  key: string;
  /** Require ⌘ on Mac, Ctrl on Windows/Linux. */
  meta?: boolean;
  /** Require Ctrl specifically (in addition to or instead of meta). */
  ctrl?: boolean;
  /** Require Shift. */
  shift?: boolean;
  /** Require Alt/Option. */
  alt?: boolean;
  /** Fire even when focus is inside an input/textarea. */
  allowInInputs?: boolean;
  /** Prevent default browser behaviour. */
  preventDefault?: boolean;
  /** Handler invoked on match. */
  handler: (event: KeyboardEvent) => void;
};

/**
 * Registers a list of keyboard shortcuts while mounted.
 * Ignores keypresses inside input fields unless `allowInInputs` is true.
 *
 * @example
 *   useHotkeys([
 *     { key: "k", meta: true, handler: openPalette, preventDefault: true },
 *     { key: "Escape", handler: closePalette },
 *   ]);
 */
export function useHotkeys(hotkeys: Hotkey[], deps: React.DependencyList = []): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase() ?? "";
      const isInput =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        target?.isContentEditable === true;

      for (const hotkey of hotkeys) {
        if (!hotkey.allowInInputs && isInput) continue;

        const keyMatch = event.key.toLowerCase() === hotkey.key.toLowerCase();

        if (!keyMatch) continue;

        const isMac =
          typeof navigator !== "undefined" && /mac/i.test(navigator.userAgent);
        const requireMeta = hotkey.meta === true;

        if (requireMeta) {
          if (isMac && !event.metaKey) continue;
          if (!isMac && !event.ctrlKey && !event.metaKey) continue;
        } else if (hotkey.ctrl && !event.ctrlKey) {
          continue;
        }

        if (hotkey.shift !== undefined && event.shiftKey !== hotkey.shift) continue;
        if (hotkey.alt !== undefined && event.altKey !== hotkey.alt) continue;

        if (hotkey.preventDefault !== false) {
          event.preventDefault();
        }

        hotkey.handler(event);

        break;
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(hotkeys), ...deps]);
}
