"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils/cn";

/* ─── Root ───────────────────────────────────────────── */

export const Tabs = TabsPrimitive.Root;

/* ─── List ───────────────────────────────────────────── */

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  /** Visual variant of the tab list container. */
  variant?: "pill" | "underline" | "plain";
};

export const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  function TabsList({ className, variant = "pill", ...props }, ref) {
    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "flex items-center",
          variant === "pill" &&
            "side-scrollbar-hide h-11 gap-1 overflow-x-auto rounded-full bg-muted p-1",
          variant === "underline" && "h-11 gap-1 border-b border-border",
          variant === "plain" && "gap-1",
          className,
        )}
        {...props}
      />
    );
  },
);

TabsList.displayName = "TabsList";

/* ─── Trigger ────────────────────────────────────────── */

export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  variant?: "pill" | "underline" | "plain";
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** Optional trailing badge (count, label). */
  badge?: React.ReactNode;
};

export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(function TabsTrigger(
  { className, variant = "pill", icon, badge, children, ...props },
  ref,
) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap",
        "text-300 font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",

        variant === "pill" &&
          [
            "rounded-full px-4 py-2",
            "text-neutral-600 hover:text-foreground",
            "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
          ].join(" "),

        variant === "underline" &&
          [
            "-mb-px border-b-2 border-transparent px-3 pb-3 pt-2",
            "text-neutral-600 hover:text-foreground",
            "data-[state=active]:border-primary data-[state=active]:text-primary",
          ].join(" "),

        variant === "plain" &&
          [
            "rounded-lg px-3 py-1.5",
            "text-neutral-600 hover:bg-muted hover:text-foreground",
            "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
          ].join(" "),

        className,
      )}
      {...props}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      {children}
      {badge ? (
        <span
          className={cn(
            "ml-1 rounded-full px-1.5 py-0.5 text-200 font-semibold",
            "bg-neutral-500/10 text-neutral-600",
            "group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary",
          )}
        >
          {badge}
        </span>
      ) : null}
    </TabsPrimitive.Trigger>
  );
});

TabsTrigger.displayName = "TabsTrigger";

/* ─── Content ────────────────────────────────────────── */

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "data-[state=active]:duration-200 data-[state=active]:animate-in data-[state=active]:fade-in-50",
        className,
      )}
      {...props}
    />
  );
});

TabsContent.displayName = "TabsContent";
