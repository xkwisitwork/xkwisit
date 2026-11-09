"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils/cn";

/* ─── Root ───────────────────────────────────────────── */

export const Dropdown = DropdownMenuPrimitive.Root;
export const DropdownTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownGroup = DropdownMenuPrimitive.Group;
export const DropdownPortal = DropdownMenuPrimitive.Portal;
export const DropdownSub = DropdownMenuPrimitive.Sub;
export const DropdownRadioGroup = DropdownMenuPrimitive.RadioGroup;

/* ─── Content ────────────────────────────────────────── */

export const DropdownContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(function DropdownContent({ className, sideOffset = 6, align = "end", ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[10rem] overflow-hidden rounded-xl border border-border bg-popover p-1.5",
          "text-popover-foreground shadow-lg",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=top]:slide-in-from-bottom-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

DropdownContent.displayName = "DropdownContent";

/* ─── Item ───────────────────────────────────────────── */

export const DropdownItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    /** Renders the item in a destructive tone. */
    destructive?: boolean;
    /** Optional leading icon. */
    icon?: ReactNode;
    /** Right-aligned shortcut hint (e.g. "⌘K"). */
    shortcut?: string;
    /** Item that acts as an anchor. */
    asChild?: boolean;
  }
>(function DropdownItem(
  { className, destructive, icon, shortcut, children, ...props },
  ref,
) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2",
        "rounded-lg px-2.5 py-2 text-400 outline-none",
        "transition-colors",
        "focus:bg-primary/5 focus:text-primary",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        destructive && "text-destructive focus:bg-destructive/5 focus:text-destructive",
        "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {icon ? <span className="shrink-0 text-current">{icon}</span> : null}
      <span className="flex-1 truncate">{children}</span>
      {shortcut ? (
        <span className="ml-4 shrink-0 font-mono text-200 text-neutral-600">
          {shortcut}
        </span>
      ) : null}
    </DropdownMenuPrimitive.Item>
  );
});

DropdownItem.displayName = "DropdownItem";

/* ─── Label / Separator ──────────────────────────────── */

export const DropdownLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(function DropdownLabel({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-2.5 py-1.5 text-200 font-semibold uppercase tracking-wide text-neutral-600",
        className,
      )}
      {...props}
    />
  );
});

DropdownLabel.displayName = "DropdownLabel";

export const DropdownSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function DropdownSeparator({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1.5 my-1 h-px bg-border", className)}
      {...props}
    />
  );
});

DropdownSeparator.displayName = "DropdownSeparator";
