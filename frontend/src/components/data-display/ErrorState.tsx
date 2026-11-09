export function ErrorState({
  title = "Something went wrong",
  description = "Try again in a moment.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-white p-8 text-center">
      <h3 className="font-display text-500 font-bold text-neutral-900">{title}</h3>
      <p className="mt-2 text-400 text-neutral-600">{description}</p>
    </div>
  );
}
