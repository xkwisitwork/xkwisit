import type { ReactNode } from "react";

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div>
        <h2 className="font-display text-600 font-bold tracking-tight text-neutral-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-400 text-neutral-600">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
