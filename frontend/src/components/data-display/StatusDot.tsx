import { cn } from "@/lib/utils/cn";

export function StatusDot({
  tone = "neutral",
  className,
}: {
  tone?: "success" | "warning" | "danger" | "neutral" | "mint";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        tone === "success" && "bg-success",
        tone === "warning" && "bg-warning",
        tone === "danger" && "bg-destructive",
        tone === "mint" && "bg-mint",
        tone === "neutral" && "bg-neutral-500",
        className,
      )}
    />
  );
}
