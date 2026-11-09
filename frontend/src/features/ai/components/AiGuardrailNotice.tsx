"use client";

export function AiGuardrailNotice() {
  return (
    <p className="rounded-xl border border-neutral-400 bg-neutral-200/40 px-4 py-3 text-300 text-neutral-600">
      Outputs are drafts. Review before sharing with clients. Prompt injection patterns
      are blocked.
    </p>
  );
}
