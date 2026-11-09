const phrases = [
  "Book a strategy call",
  "Find the real bottleneck",
  "Stop paying for the same ads",
  "Fix the broken part first",
  "See what came back as a sale",
] as const;

export function MarqueeTicker() {
  const loop = [...phrases, ...phrases, ...phrases];

  return (
    <div className="overflow-hidden bg-primary py-3.5 text-primary-foreground">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {loop.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="inline-flex items-center gap-8 text-400 font-semibold tracking-wide"
          >
            {phrase}
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent-400"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
