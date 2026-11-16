import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
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

function renderInner({
  loading,
  loadingText,
  leftIcon,
  rightIcon,
  label,
}: {
  loading: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label: ReactNode;
}) {
  if (loading) {
    return (
      <>
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        <span className="truncate">{loadingText ?? label}</span>
      </>
    );
  }

  return (
    <>
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      {label != null && label !== false ? (
        <span className="truncate">{label}</span>
      ) : null}
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </>
  );
}

/**
 * The canonical button across the platform.
 * Supports 8 visual variants, 7 sizes, icon slots, and a built-in loading state.
 *
 * When `asChild` is set, icons are injected into the single child (e.g. Link)
 * so the label stays visible — Slot cannot wrap a fragment of icon + child.
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
  const isDisabled = disabled || loading;
  const classes = cn(
    buttonVariants({ variant, size, fullWidth, pill }),
    loading && "cursor-wait",
    className,
  );

  if (asChild) {
    const child = Children.only(children);
    if (!isValidElement(child)) {
      return null;
    }

    const element = child as ReactElement<{
      children?: ReactNode;
      className?: string;
    }>;

    return (
      <Slot
        ref={ref}
        aria-disabled={isDisabled ? true : undefined}
        aria-busy={loading || undefined}
        className={classes}
        {...props}
      >
        {cloneElement(element, {
          children: renderInner({
            loading,
            loadingText,
            leftIcon,
            rightIcon,
            label: element.props.children,
          }),
        })}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={classes}
      {...props}
    >
      {renderInner({
        loading,
        loadingText,
        leftIcon,
        rightIcon,
        label: children,
      })}
    </button>
  );
});

Button.displayName = "Button";
