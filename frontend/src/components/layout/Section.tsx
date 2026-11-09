import { forwardRef, type ElementType, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

import { Container, type ContainerProps } from "./Container";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Semantic element. Defaults to `section`. */
  as?: ElementType;
  /** Vertical padding preset. */
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  /** Optional background treatment. */
  tone?: "default" | "muted" | "inverse";
  /** When true, wraps children in the shared `Container`. */
  contained?: boolean;
  /** Forwarded to `Container` when `contained` is true. */
  containerSize?: ContainerProps["size"];
  /** Optional `id` for in-page anchors / skip links. */
  id?: string;
};

const spacingMap = {
  none: "",
  sm: "py-10 tablet:py-12",
  md: "py-16 tablet:py-20",
  lg: "py-20 tablet:py-28",
  xl: "py-24 tablet:py-32",
} as const;

const toneMap = {
  default: "bg-transparent",
  muted: "bg-neutral-200",
  inverse: "bg-neutral-900 text-neutral-100",
} as const;

/**
 * Page section with consistent vertical rhythm.
 * Optionally wraps content in `Container`.
 *
 * @example
 *   <Section contained spacing="lg" tone="muted">
 *     ...
 *   </Section>
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    as: Comp = "section",
    className,
    spacing = "md",
    tone = "default",
    contained = false,
    containerSize = "xl",
    children,
    ...props
  },
  ref,
) {
  const content = contained ? (
    <Container size={containerSize}>{children}</Container>
  ) : (
    children
  );

  return (
    <Comp
      ref={ref}
      className={cn(spacingMap[spacing], toneMap[tone], className)}
      {...props}
    >
      {content}
    </Comp>
  );
});

Section.displayName = "Section";
