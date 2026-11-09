"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils/cn";

export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(function RadioGroup({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
});

RadioGroup.displayName = "RadioGroup";

/* ─── RadioGroupItem ─────────────────────────────────── */

export const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(function RadioGroupItem({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-5 w-5 rounded-full border-2 border-neutral-500/50 text-primary",
        "transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-primary",
        "hover:border-primary",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";

/* ─── RadioOption (convenience) ──────────────────────── */

export type RadioOptionProps = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

/**
 * Convenience label wrapper for a radio item + label + description.
 *
 * @example
 *   <RadioGroup value={plan} onValueChange={setPlan}>
 *     <RadioOption value="monthly" label="Monthly" description="₦1.2M/month" />
 *     <RadioOption value="annual" label="Annual" description="Save 20%" />
 *   </RadioGroup>
 */
export function RadioOption({
  value,
  label,
  description,
  disabled,
  className,
}: RadioOptionProps) {
  const id = `radio-${value}`;

  return (
    <label
      htmlFor={id}
      className={cn(
        "group flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4",
        "transition-colors hover:border-primary hover:bg-primary/[0.02]",
        "has-[:checked]:border-primary has-[:checked]:bg-primary/[0.04]",
        disabled &&
          "cursor-not-allowed opacity-60 hover:border-border hover:bg-transparent",
        className,
      )}
    >
      <RadioGroupItem id={id} value={value} disabled={disabled} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <p className="text-400 font-medium leading-tight">{label}</p>
        {description ? (
          <p className="mt-1 text-300 leading-snug text-neutral-600">{description}</p>
        ) : null}
      </div>
    </label>
  );
}
