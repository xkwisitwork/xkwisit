"use client";

import { useCallback, useState } from "react";

type UseCopyToClipboardReturn = {
  copied: boolean;
  value: string | null;
  copy: (text: string, options?: { resetAfterMs?: number }) => Promise<boolean>;
  reset: () => void;
};

/**
 * Copies text to the clipboard and tracks a "copied" flag.
 *
 * @example
 *   const { copied, copy } = useCopyToClipboard();
 *   <button onClick={() => copy(link)}>{copied ? "Copied!" : "Copy"}</button>
 */
export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const reset = useCallback(() => {
    setCopied(false);
    setValue(null);
  }, []);

  const copy = useCallback(
    async (text: string, options: { resetAfterMs?: number } = {}) => {
      const { resetAfterMs = 2000 } = options;

      if (typeof navigator === "undefined" || !navigator.clipboard) {
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setValue(text);
        setCopied(true);

        if (resetAfterMs > 0) {
          setTimeout(() => setCopied(false), resetAfterMs);
        }

        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  return { copied, value, copy, reset };
}
