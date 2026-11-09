import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { buttonVariants, type ButtonVariant, type ButtonSize } from "./variants";

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** Accessible label for screen readers - required. */
  "aria-label": string;
  /** Icon to render. */
  icon: ReactNode;
  variant?: ButtonVariant;
  size?: Extract<ButtonSize, "icon-sm" | "icon" | "icon-lg">;
  /** Optional tooltip content; falls back to aria-label. */
  tooltip?: string;
};

/**
 * Square button containing only an icon.
 * Always requires an accessible label.
 *
 * @example
 * <IconButton aria-label="Close dialog" icon={<X />} size="icon-sm" variant="ghost" />
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { className, variant = "ghost", size = "icon", icon, tooltip, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={props.type ?? "button"}
        title={tooltip ?? props["aria-label"]}
        className={cn(
          buttonVariants({ variant, size, pill: true }),
          "aspect-square p-0",
          className,
        )}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
