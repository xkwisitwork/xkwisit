"use client";

import { useCallback, useState } from "react";

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "destructive";
};

let listeners: Array<(toasts: ToastItem[]) => void> = [];
let memory: ToastItem[] = [];

function emit() {
  for (const l of listeners) l(memory);
}

export function toast(item: Omit<ToastItem, "id">) {
  const next: ToastItem = { id: String(Date.now()), ...item };
  memory = [next, ...memory].slice(0, 5);
  emit();
  return next.id;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>(memory);

  const subscribe = useCallback(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  // lightweight subscribe on first render
  if (typeof window !== "undefined" && !listeners.includes(setToasts)) {
    subscribe();
  }

  const dismiss = useCallback((id: string) => {
    memory = memory.filter((t) => t.id !== id);
    emit();
  }, []);

  return { toasts, toast, dismiss };
}
