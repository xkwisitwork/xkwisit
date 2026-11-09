import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { Breadcrumb } from "@/types/common";
import { cn } from "@/lib/utils/cn";

export type BreadcrumbsProps = {
  items: Breadcrumb[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumbs" className={cn("flex items-center", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-300">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-neutral-600 transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast ? "font-medium text-neutral-900" : "text-neutral-600",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast ? (
                <ChevronRight
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 text-neutral-600"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
