"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils/cn";

/* ─── Root ───────────────────────────────────────────── */

export const Accordion = AccordionPrimitive.Root;

/* ─── Item ───────────────────────────────────────────── */

export type AccordionItemProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> & {
  /** Adds a subtle divider + spacing between items. */
  bordered?: boolean;
};

export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(function AccordionItem({ className, bordered = true, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(bordered && "border-b border-border last:border-b-0", className)}
      {...props}
    />
  );
});

AccordionItem.displayName = "AccordionItem";

/* ─── Trigger ────────────────────────────────────────── */

export type AccordionTriggerProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  /** Optional leading icon. */
  icon?: ReactNode;
};

export const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(function AccordionTrigger({ className, children, icon, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-between gap-3",
          "py-4 text-left text-500 font-medium leading-tight",
          "transition-all duration-200",
          "hover:text-primary",
          "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        <span className="flex items-center gap-3">
          {icon ? (
            <span className="shrink-0 text-neutral-600 group-hover:text-primary [&_svg]:h-4 [&_svg]:w-4">
              {icon}
            </span>
          ) : null}
          <span className="min-w-0">{children}</span>
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-neutral-600 transition-transform duration-300 group-hover:text-primary"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

/* ─── Content ────────────────────────────────────────── */

export const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-400 leading-relaxed text-neutral-600",
        "data-[state=closed]:animate-accordion-up",
        "data-[state=open]:animate-accordion-down",
        className,
      )}
      {...props}
    >
      <div className="pb-4">{children}</div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = "AccordionContent";
