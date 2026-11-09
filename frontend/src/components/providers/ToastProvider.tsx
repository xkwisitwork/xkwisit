"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * Application-wide toast surface.
 * Imported once from `src/contexts/Providers.tsx` when needed.
 * Currently `Providers.tsx` mounts Sonner directly; this component exists
 * for cases where the toast configuration needs to be themed per surface.
 */
export function ToastProvider() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      expand
      visibleToasts={5}
      toastOptions={{
        className: "font-sans",
        duration: 4000,
      }}
    />
  );
}
