"use client";

import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils/cn";

export type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  /** Optional label rendered next to the switch. */
  label?: ReactNode;
  /** Optional helper text. */
  hint?: string;
  /** Position of the label relative to the switch. */
  labelPosition?: "left" | "right";
  /** Container class. */
  containerClassName?: string;
};

/**
 * Toggle switch built on Radix.
 *
 * @example
 *   <Switch
 *     label="Enable MFA"
 *     checked={mfa}
 *     onCheckedChange={setMfa}
 *   />
 */
export const Switch = forwardRef<ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  function Switch(
    {
      className,
      containerClassName,
      label,
      hint,
      labelPosition = "right",
      id: idProp,
      disabled,
      ...props
    },
    ref,
  ) {
    const reactId = useId();
    const id = idProp ?? reactId;

    return (
      <div className={cn("space-y-1", containerClassName)}>
        <div
          className={cn(
            "flex items-center gap-3",
            labelPosition === "left" && "flex-row-reverse justify-end",
          )}
        >
          <SwitchPrimitive.Root
            ref={ref}
            id={id}
            disabled={disabled}
            className={cn(
              "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center",
              "rounded-full border-2 border-transparent transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "data-[state=unchecked]:bg-neutral-400",
              "data-[state=checked]:bg-primary",
              className,
            )}
            {...props}
          >
            <SwitchPrimitive.Thumb
              className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0",
                "transition-transform",
                "data-[state=unchecked]:translate-x-0",
                "data-[state=checked]:translate-x-5",
              )}
            />
          </SwitchPrimitive.Root>

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

        {hint ? <p className="text-200 text-neutral-600">{hint}</p> : null}
      </div>
    );
  },
);

Switch.displayName = "Switch";
