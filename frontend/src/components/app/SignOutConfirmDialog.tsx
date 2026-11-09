"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils/cn";

export type SignOutConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Bounce-in confirmation before leaving the workspace.
 */
export function SignOutConfirmDialog({
  open,
  onOpenChange,
}: SignOutConfirmDialogProps) {
  const { signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, loading, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function handleConfirm() {
    if (loading) return;
    setLoading(true);
    try {
      await signOut();
    } catch {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="presentation"
        >
          <motion.button
            type="button"
            aria-label="Dismiss"
            className="absolute inset-0 bg-[#0B021F]/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (!loading) onOpenChange(false);
            }}
          />

          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="sign-out-title"
            aria-describedby="sign-out-desc"
            className={cn(
              "relative z-[1] w-full max-w-[22rem] overflow-hidden rounded-[1.75rem]",
              "border border-[#EDE8F7] bg-white p-6 shadow-[0_28px_64px_-28px_rgba(22,2,74,0.55)]",
            )}
            initial={{ opacity: 0, scale: 0.72, y: 28 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 520,
                damping: 16,
                mass: 0.75,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 12,
              transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
            }}
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#FEF3F2] text-[#B42318]">
              <LogOut className="h-6 w-6" aria-hidden />
            </div>

            <h2
              id="sign-out-title"
              className="mt-4 text-center font-display text-[1.25rem] font-bold tracking-tight text-[#16024A]"
            >
              Sign out?
            </h2>
            <p
              id="sign-out-desc"
              className="mt-2 text-center text-[0.88rem] leading-relaxed text-neutral-500"
            >
              You will leave this workspace and need to sign in again to continue.
            </p>

            <div className="mt-6 grid gap-2.5">
              <button
                type="button"
                onClick={() => void handleConfirm()}
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#B42318] px-4 text-[0.86rem] font-semibold text-white transition hover:bg-[#912018] disabled:opacity-60"
              >
                {loading ? "Signing out…" : "Yes, sign out"}
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-full border border-[#E8E2F4] bg-white px-4 text-[0.86rem] font-semibold text-[#16024A] transition hover:bg-[#F7F5FC] disabled:opacity-60"
              >
                Stay signed in
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
