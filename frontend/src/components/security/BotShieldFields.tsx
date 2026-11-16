"use client";

import type { MutableRefObject } from "react";

/**
 * Invisible anti-bot fields:
 * - honeypot input (must stay empty; bots often autofill it)
 * - challenge values are attached on submit via `useBotShield().ensureReady()`
 */
export function BotShieldFields({
  honeypotRef,
}: {
  honeypotRef?: MutableRefObject<string>;
}) {
  return (
    <div
      aria-hidden
      className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      tabIndex={-1}
    >
      <label>
        Company website
        <input
          type="text"
          name="company_website"
          autoComplete="off"
          tabIndex={-1}
          defaultValue=""
          onChange={(e) => {
            if (honeypotRef) honeypotRef.current = e.target.value;
          }}
        />
      </label>
    </div>
  );
}
