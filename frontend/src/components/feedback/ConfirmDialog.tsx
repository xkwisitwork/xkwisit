"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export type ConfirmDialogProps = {
  className?: string;
  open?: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function ConfirmDialog({
  className,
  open = true,
  title = "Confirm Dialog",
  description = "Confirm this action to continue.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <Card className={cn("max-w-md border-mint/20 shadow-lg", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button type="button" variant="contained" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
