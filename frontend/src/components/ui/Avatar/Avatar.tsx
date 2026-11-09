"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils/cn";
import { getInitials } from "@/lib/utils/format";

/* ─── Root ───────────────────────────────────────────── */

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-200",
  sm: "h-8 w-8 text-300",
  md: "h-10 w-10 text-400",
  lg: "h-14 w-14 text-600",
  xl: "h-20 w-20 text-700",
};

export type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize;
  /** Image source. If missing, initials are rendered. */
  src?: string | null;
  /** Alt text for the image. */
  alt?: string;
  /** Full name used to derive initials fallback. */
  name?: string;
  /** Fallback background color (CSS value). */
  fallbackColor?: string;
};

export const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  function Avatar(
    { className, size = "md", src, alt, name, fallbackColor, ...props },
    ref,
  ) {
    const initials = name ? getInitials(name, 2) : "?";

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizeMap[size],
          className,
        )}
        {...props}
      >
        {src ? (
          <AvatarPrimitive.Image
            src={src}
            alt={alt ?? name ?? "Avatar"}
            className="aspect-square h-full w-full object-cover"
          />
        ) : null}
        <AvatarPrimitive.Fallback
          delayMs={src ? 300 : 0}
          style={fallbackColor ? { backgroundColor: fallbackColor } : undefined}
          className={cn(
            "flex h-full w-full items-center justify-center",
            "bg-primary/10 font-semibold uppercase tracking-wide text-primary",
          )}
        >
          {initials}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  },
);

Avatar.displayName = "Avatar";

/* ─── Status dot overlay ────────────────────────────── */

export type AvatarStatus = "online" | "away" | "busy" | "offline";

const statusColorMap: Record<AvatarStatus, string> = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-destructive",
  offline: "bg-neutral-500",
};

export type AvatarWithStatusProps = AvatarProps & {
  status?: AvatarStatus;
};

export function AvatarWithStatus({
  status,
  size = "md",
  className,
  ...props
}: AvatarWithStatusProps) {
  const dotSize = {
    xs: "h-1.5 w-1.5",
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
    xl: "h-4 w-4",
  }[size];

  return (
    <div className="relative inline-block">
      <Avatar size={size} className={className} {...props} />
      {status ? (
        <span
          aria-label={`Status: ${status}`}
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-background",
            dotSize,
            statusColorMap[status],
          )}
        />
      ) : null}
    </div>
  );
}

/* ─── AvatarGroup ───────────────────────────────────── */

export type AvatarGroupProps = {
  /** List of avatar items to render. */
  items: Array<{
    id: string;
    src?: string | null;
    name?: string;
    alt?: string;
    fallbackColor?: string;
  }>;
  /** Maximum avatars shown before collapsing into a "+N" indicator. */
  max?: number;
  /** Size applied to every avatar in the group. */
  size?: AvatarSize;
  /** Overlap amount. */
  overlap?: "sm" | "md" | "lg";
  className?: string;
};

const overlapMap = {
  sm: "-space-x-1",
  md: "-space-x-2",
  lg: "-space-x-3",
};

export function AvatarGroup({
  items,
  max = 4,
  size = "md",
  overlap = "md",
  className,
}: AvatarGroupProps) {
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div className={cn("flex items-center", overlapMap[overlap], className)}>
      {visible.map((item) => (
        <Avatar
          key={item.id}
          size={size}
          src={item.src ?? undefined}
          name={item.name}
          alt={item.alt}
          fallbackColor={item.fallbackColor}
          className="ring-2 ring-background"
        />
      ))}
      {overflow > 0 ? (
        <Avatar size={size} name={`+${overflow}`} className="ring-2 ring-background" />
      ) : null}
    </div>
  );
}
