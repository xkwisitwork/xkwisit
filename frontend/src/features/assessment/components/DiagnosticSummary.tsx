"use client";

export function DiagnosticSummary({ summary }: { summary: string }) {
  return (
    <div className="rounded-[1.5rem] border border-neutral-400/70 bg-mint-soft/50 p-5 mobile-sm:p-6">
      <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mint">
        What this means
      </p>
      <p className="mt-3 text-400 leading-relaxed text-neutral-800">{summary}</p>
    </div>
  );
}
