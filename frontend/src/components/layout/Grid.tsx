import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Grid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3", className)}
      {...props}
    />
  );
}
