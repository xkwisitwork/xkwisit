import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type PageHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  description?: ReactNode;
  /** Actions rendered on the right (buttons, menus). */
  actions?: ReactNode;
  /** Breadcrumbs rendered above the title. */
  breadcrumbs?: ReactNode;
};

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { className, title, description, actions, breadcrumbs, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 mobile-md:gap-4 tablet:flex-row tablet:items-end tablet:justify-between",
        className,
      )}
      {...props}
    >
      <div className="min-w-0 text-left">
        {breadcrumbs ? <div className="mb-2">{breadcrumbs}</div> : null}

        <h1 className="font-display text-600 leading-tight tracking-tight tablet:text-700">
          {title}
        </h1>

        {description ? (
          <p className="mt-1 max-w-2xl text-300 leading-relaxed text-neutral-600 tablet:text-400">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
});

PageHeader.displayName = "PageHeader";
