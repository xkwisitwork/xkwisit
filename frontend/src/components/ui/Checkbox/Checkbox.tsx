"use client";

import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils/cn";

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  /** Optional label rendered next to the checkbox. */
  label?: ReactNode;
  /** Optional helper text under the label. */
  hint?: string;
  /** Error message. */
  error?: string;
  /** Container class. */
  containerClassName?: string;
  /** Allows the indeterminate state (dash instead of check). */
  indeterminate?: boolean;
};

/**
 * Accessible checkbox built on Radix.
 *
 * @example
 *   <Checkbox
 *     label="I agree to the terms"
 *     checked={agreed}
 *     onCheckedChange={setAgreed}
 *   />
 */
export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox(
  {
    className,
    containerClassName,
    label,
    hint,
    error,
    indeterminate,
    id: idProp,
    disabled,
    checked,
    ...props
  },
  ref,
) {
  const reactId = useId();
  const id = idProp ?? reactId;
  const hasError = Boolean(error);
  const isIndeterminate = indeterminate === true && checked !== true;

  return (
    <div className={cn("space-y-1", containerClassName)}>
      <div className="flex items-start gap-2.5">
        <CheckboxPrimitive.Root
          ref={ref}
          id={id}
          disabled={disabled}
          checked={isIndeterminate ? "indeterminate" : checked}
          aria-invalid={hasError || undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            "peer mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center",
            "rounded-[5px] border-2 bg-background transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
            hasError
              ? "border-destructive"
              : "border-neutral-500/50 hover:border-primary",
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            {isIndeterminate ? (
              <Minus className="h-3 w-3" strokeWidth={3} />
            ) : (
              <Check className="h-3 w-3" strokeWidth={3} />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {label && (
          <label
            htmlFor={id}
            className={cn(
              "cursor-pointer select-none text-400 leading-snug",
              disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {label}
          </label>
        )}
      </div>

      {hasError ? (
        <p id={`${id}-error`} className="text-200 text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-200 text-neutral-600">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

Checkbox.displayName = "Checkbox";
