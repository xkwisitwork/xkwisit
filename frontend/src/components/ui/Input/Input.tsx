import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils/cn";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  /** Optional leading icon. */
  leftIcon?: ReactNode;
  /** Optional trailing icon (not rendered if `loading` or `error`). */
  rightIcon?: ReactNode;
  /** Error message. When present, styles the input in error state. */
  error?: string;
  /** Helper text shown when no error is present. */
  hint?: string;
  /** Optional label associated with the input. */
  label?: string;
  /** Container class (wrapper, not input). */
  containerClassName?: string;
  /** Size variant. */
  inputSize?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-9 text-300",
  md: "h-11 text-400",
  lg: "h-14 text-500",
} as const;

const iconPaddingMap = {
  left: { sm: "pl-9", md: "pl-11", lg: "pl-12" },
  right: { sm: "pr-9", md: "pr-11", lg: "pr-12" },
} as const;

/**
 * Text input with optional label, icons, error state, and hint text.
 * Fully accessible: auto-wires label, error, and hint to the input.
 *
 * @example
 *   <Input
 *     label="Email"
 *     type="email"
 *     placeholder="you@example.com"
 *     leftIcon={<Mail />}
 *     error={errors.email?.message}
 *   />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    containerClassName,
    type = "text",
    inputSize = "md",
    leftIcon,
    rightIcon,
    error,
    hint,
    label,
    id: idProp,
    disabled,
    ...props
  },
  ref,
) {
  const reactId = useId();
  const id = idProp ?? reactId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : hint ? hintId : undefined;

  return (
    <div className={cn("w-full space-y-1.5", containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "block text-300 font-medium text-foreground",
            disabled && "opacity-60",
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600",
              "[&_svg]:h-4 [&_svg]:w-4",
            )}
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cn(
            "flex w-full rounded-lg border bg-background px-4 py-2 text-foreground",
            "placeholder:text-neutral-600",
            "transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-60",
            "file:border-0 file:bg-transparent file:text-400 file:font-medium",
            sizeMap[inputSize],
            leftIcon && iconPaddingMap.left[inputSize],
            rightIcon && !hasError && iconPaddingMap.right[inputSize],
            hasError
              ? "border-destructive focus-visible:ring-destructive"
              : "border-border hover:border-neutral-500/40 focus-visible:border-primary",
            className,
          )}
          {...props}
        />

        {hasError ? (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-destructive",
              "[&_svg]:h-4 [&_svg]:w-4",
            )}
          >
            <AlertCircle />
          </span>
        ) : (
          rightIcon && (
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600",
                "[&_svg]:h-4 [&_svg]:w-4",
              )}
            >
              {rightIcon}
            </span>
          )
        )}
      </div>

      {hasError ? (
        <p id={errorId} className="text-200 text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-200 text-neutral-600">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";
