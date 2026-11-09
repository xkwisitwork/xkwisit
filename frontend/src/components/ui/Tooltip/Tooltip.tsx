"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils/cn";

/* ─── Provider (mount once per tree) ────────────────── */

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;

/* ─── Content ────────────────────────────────────────── */

export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 overflow-hidden rounded-lg",
          "bg-neutral-900 px-2.5 py-1.5",
          "text-200 font-medium leading-snug text-neutral-100",
          "shadow-lg",
          "max-w-xs text-balance",
          "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-1",
          "data-[side=top]:slide-in-from-bottom-1",
          "data-[side=left]:slide-in-from-right-1",
          "data-[side=right]:slide-in-from-left-1",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});

TooltipContent.displayName = "TooltipContent";

/* ─── Convenience wrapper ───────────────────────────── */

export type TooltipProps = {
  /** Content shown inside the tooltip. */
  content: ReactNode;
  /** Element that triggers the tooltip. */
  children: ReactNode;
  /** Preferred side to render the tooltip. */
  side?: "top" | "right" | "bottom" | "left";
  /** Alignment relative to the trigger. */
  align?: "start" | "center" | "end";
  /** Delay before showing, in ms. */
  delayDuration?: number;
  /** Skip the delay on subsequent opens within this window. */
  skipDelayDuration?: number;
  /** Disable the tooltip entirely. */
  disabled?: boolean;
  /** Optional class for the content. */
  className?: string;
  /** Force the tooltip open (useful for tests). */
  defaultOpen?: boolean;
};

/**
 * Pre-composed tooltip. The most common case is a single trigger + content.
 *
 * @example
 *   <Tooltip content="Copy to clipboard">
 *     <IconButton aria-label="Copy" icon={<Copy />} />
 *   </Tooltip>
 */
export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 300,
  skipDelayDuration = 300,
  disabled,
  className,
  defaultOpen,
}: TooltipProps) {
  if (disabled) return <>{children}</>;

  return (
    <TooltipRoot delayDuration={delayDuration} defaultOpen={defaultOpen}>
      <TooltipProvider skipDelayDuration={skipDelayDuration}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} className={className}>
          {content}
        </TooltipContent>
      </TooltipProvider>
    </TooltipRoot>
  );
}
