import { Spinner } from "./Spinner";

export function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-12 text-400 text-neutral-600">
      <Spinner />
      <span>{label}</span>
    </div>
  );
}
