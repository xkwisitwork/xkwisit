"use client";

import { useState } from "react";
import { Mic } from "lucide-react";

import { cn } from "@/lib/utils/cn";

import { ensureMicrophoneAccess } from "./speech";
import { VoiceGuideModal } from "./VoiceGuideModal";

export type VoiceGuideTriggerProps = {
  className?: string;
};

/**
 * Navbar mic trigger + Ask Xkwisit modal.
 * Always mount in the header chrome — never inside the hamburger drawer.
 * Mic permission is requested on this same click so the browser Allow prompt
 * rides the user gesture (Permissions-Policy must allow microphone=(self)).
 */
export function VoiceGuideTrigger({ className }: VoiceGuideTriggerProps) {
  const [open, setOpen] = useState(false);
  const [autoListen, setAutoListen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          void (async () => {
            const access = await ensureMicrophoneAccess();
            setAutoListen(access === "granted");
            setOpen(true);
          })();
        }}
        aria-label="Ask Xkwisit by voice"
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          "border border-mint/20 bg-mint-soft text-mint transition-all",
          "hover:border-mint/40 hover:bg-mint hover:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/40 focus-visible:ring-offset-2",
          open && "border-mint bg-mint text-white shadow-[0_0_0_4px_rgba(59,5,196,0.12)]",
          className,
        )}
      >
        <Mic className="h-4 w-4" aria-hidden />
        {open ? (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#FC3FE3]"
          />
        ) : null}
      </button>

      <VoiceGuideModal
        open={open}
        autoListen={autoListen}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setAutoListen(false);
        }}
      />
    </>
  );
}
