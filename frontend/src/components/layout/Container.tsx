import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** Visual width preset. */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Disables horizontal padding. */
  bare?: boolean;
};

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-full",
  full: "max-w-full",
} as const;

/**
 * Centered content container with responsive padding.
 * The default size matches the Tailwind `container` config (`laptop-lg`).
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { className, size = "xl", bare, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full",
        sizeMap[size],
        !bare && "px-4 tablet:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = "Container";
