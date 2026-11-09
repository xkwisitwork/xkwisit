import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils/cn";

import { buttonVariants, type ButtonVariants } from "./variants";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    /** Leading icon node. */
    leftIcon?: ReactNode;
    /** Trailing icon node. */
    rightIcon?: ReactNode;
    /** Shows a spinner and disables interaction. */
    loading?: boolean;
    /** Text shown while loading (falls back to children). */
    loadingText?: string;
    /** Render as child element (e.g. Next.js Link) via Radix Slot. */
    asChild?: boolean;
  };

/**
 * The canonical button across the platform.
 * Supports 8 visual variants, 7 sizes, icon slots, and a built-in loading state.
 *
 * @example
 *   <Button variant="contained" size="lg" leftIcon={<Plus />}>
 *     Add Client
 *   </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size,
    fullWidth,
    pill,
    leftIcon,
    rightIcon,
    loading = false,
    loadingText,
    disabled,
    children,
    type = "button",
    asChild = false,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      disabled={asChild ? undefined : isDisabled}
      aria-disabled={asChild && isDisabled ? true : undefined}
      aria-busy={loading || undefined}
      className={cn(
        buttonVariants({ variant, size, fullWidth, pill }),
        loading && "cursor-wait",
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </Comp>
  );
});

Button.displayName = "Button";
