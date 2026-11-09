"use client";

export function RoadmapPreview({ items }: { items: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-neutral-400/70 bg-white p-5 mobile-sm:p-6">
      <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mint">
        What to do next
      </p>
      <p className="mt-1 text-300 text-neutral-600">
        Start at the top. One lever at a time.
      </p>
      {items.length === 0 ? (
        <p className="mt-4 text-300 text-neutral-600">No roadmap items yet.</p>
      ) : (
        <ol className="mt-5 space-y-3">
          {items.map((item, i) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-neutral-400/60 bg-neutral-100 px-4 py-3"
            >
              <span className="font-display text-500 font-bold tabular-nums text-mint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-300 leading-relaxed text-neutral-700 mobile-sm:text-400">
                {item}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
