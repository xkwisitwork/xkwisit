"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function CookieBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg rounded-2xl border border-neutral-400/60 bg-white p-4 shadow-lg tablet:inset-x-auto tablet:right-6">
      <p className="text-300 text-neutral-600">
        We use cookies to improve the product experience.
      </p>
      <div className="mt-3 flex gap-2">
        <Button
          size="sm"
          className="!rounded-full !bg-mint !text-white"
          onClick={() => setOpen(false)}
        >
          Accept
        </Button>
        <Button
          size="sm"
          variant="outlined"
          className="!rounded-full"
          onClick={() => setOpen(false)}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
