import { forwardRef, useId, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Optional label rendered above the textarea. */
  label?: string;
  /** Error message. Styles the textarea in error state. */
  error?: string;
  /** Helper text shown when no error. */
  hint?: string;
  /** Container class (wrapper, not textarea). */
  containerClassName?: string;
  /** Shows a live character counter. Requires `maxLength`. */
  showCount?: boolean;
};

/**
 * Multi-line text input.
 * Auto-wires label, error message, and character counter for accessibility.
 *
 * @example
 *   <Textarea
 *     label="Notes"
 *     maxLength={500}
 *     showCount
 *     rows={4}
 *     error={errors.notes?.message}
 *   />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    className,
    containerClassName,
    label,
    error,
    hint,
    showCount = false,
    maxLength,
    value,
    id: idProp,
    disabled,
    rows = 4,
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

  const charCount = typeof value === "string" ? value.length : 0;

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

      <textarea
        ref={ref}
        id={id}
        rows={rows}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        className={cn(
          "flex w-full rounded-lg border bg-background px-4 py-3 text-400 text-foreground",
          "placeholder:text-neutral-600",
          "resize-y transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "max-h-[400px] min-h-[80px]",
          hasError
            ? "border-destructive focus-visible:ring-destructive"
            : "border-border hover:border-neutral-500/40 focus-visible:border-primary",
          className,
        )}
        {...props}
      />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
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

        {showCount && maxLength ? (
          <p
            aria-live="polite"
            className={cn(
              "shrink-0 text-200 tabular-nums",
              charCount > maxLength * 0.9 ? "text-warning" : "text-neutral-600",
            )}
          >
            {charCount}/{maxLength}
          </p>
        ) : null}
      </div>
    </div>
  );
});

Textarea.displayName = "Textarea";
