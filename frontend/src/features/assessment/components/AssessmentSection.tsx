"use client";

export function AssessmentSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-600 font-medium">{title}</h2>
        {description ? (
          <p className="mt-1 text-300 text-neutral-600">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
