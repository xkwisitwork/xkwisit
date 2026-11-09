"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-white p-8 text-center">
      <h2 className="font-display text-600 font-bold text-neutral-900">Portal error</h2>
      <p className="mt-2 text-400 text-neutral-600">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-mint px-5 py-2.5 text-400 font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
