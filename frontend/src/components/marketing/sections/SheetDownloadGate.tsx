"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Download, Loader2 } from "lucide-react";

import {
  createSheetDownload,
  sheetDownloadFileUrl,
} from "@/features/sheet-downloads/api/sheet-downloads.api";
import { ApiRequestError } from "@/lib/api/errors";
import { cn } from "@/lib/utils/cn";

const RETRY_WAIT_SECONDS = 30;

type SheetDownloadGateProps = {
  className?: string;
  buttonClassName?: string;
  label?: string;
  compact?: boolean;
};

function networkRetryMessage(seconds: number) {
  const unit = seconds === 1 ? "second" : "seconds";
  return `Please, check your internet connection and try again in ${seconds} ${unit}`;
}

/**
 * Collects name, email, and phone before unlocking the growth strategy PDF.
 * Saves the lead on the backend so admins can track downloads.
 */
export function SheetDownloadGate({
  className,
  buttonClassName,
  label = "Download Free Package",
  compact = false,
}: SheetDownloadGateProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [retryIn, setRetryIn] = useState(0);

  useEffect(() => {
    if (retryIn <= 0) {
      return;
    }

    setError(networkRetryMessage(retryIn));

    const timer = window.setTimeout(() => {
      setRetryIn((seconds) => {
        const next = Math.max(0, seconds - 1);
        if (next === 0) setError(null);
        return next;
      });
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [retryIn]);

  function resetFormChrome() {
    setDone(false);
    setError(null);
    setRetryIn(0);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (retryIn > 0 || pending) return;

    setError(null);
    setPending(true);

    try {
      const lead = await createSheetDownload({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });

      const anchor = document.createElement("a");
      anchor.href = sheetDownloadFileUrl(lead.id);
      anchor.download = "XKWISIT_BUSINESS_GROWTH_STRATEGY.pdf";
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      setDone(true);
      setOpen(false);
      setName("");
      setEmail("");
      setPhone("");
      setRetryIn(0);
    } catch (err) {
      const isNetwork =
        err instanceof ApiRequestError && err.code === "NETWORK_ERROR";

      if (isNetwork) {
        setRetryIn(RETRY_WAIT_SECONDS);
        setError(networkRetryMessage(RETRY_WAIT_SECONDS));
      } else {
        setRetryIn(0);
        setError(
          err instanceof Error
            ? err.message
            : "Could not unlock the sheet. Check your details and try again.",
        );
      }
    } finally {
      setPending(false);
    }
  }

  const waiting = retryIn > 0;

  return (
    <div className={cn("w-full", className)}>
      {!open ? (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            resetFormChrome();
          }}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-full border border-mint-ice px-4 py-2.5 text-[0.88rem] font-semibold text-mint-ink",
            buttonClassName,
          )}
        >
          <Download className="h-4 w-4" aria-hidden />
          {done ? "Download again" : label}
        </button>
      ) : (
        <form
          onSubmit={onSubmit}
          className={cn(
            "rounded-[1.25rem] border border-[#E7DEFF] bg-[#F7F4FF] p-4 text-left",
            compact && "p-3",
          )}
        >
          <p className="font-display text-[0.95rem] font-bold text-[#16024A]">
            Unlock your free package
          </p>
          <p className="mt-1 text-[0.78rem] leading-snug text-[#3A3358]">
            Name, email, and phone - then the PDF downloads straight away.
          </p>

          <div className="mt-3 grid gap-2.5">
            <label className="block">
              <span className="mb-1 block text-[0.72rem] font-semibold text-[#16024A]">
                Full name
              </span>
              <input
                required
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Okonkwo"
                disabled={waiting}
                className="w-full rounded-xl border border-[#D8CFE8] bg-white px-3 py-2.5 text-[0.92rem] font-medium text-[#16024A] outline-none ring-[#3B05C4]/25 placeholder:font-normal placeholder:text-[#5C5478] focus:border-[#3B05C4] focus:ring-2 disabled:opacity-60"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[0.72rem] font-semibold text-[#16024A]">
                Work email
              </span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={waiting}
                className="w-full rounded-xl border border-[#D8CFE8] bg-white px-3 py-2.5 text-[0.92rem] font-medium text-[#16024A] outline-none ring-[#3B05C4]/25 placeholder:font-normal placeholder:text-[#5C5478] focus:border-[#3B05C4] focus:ring-2 disabled:opacity-60"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[0.72rem] font-semibold text-[#16024A]">
                Phone / WhatsApp
              </span>
              <input
                required
                type="tel"
                name="phone"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                disabled={waiting}
                className="w-full rounded-xl border border-[#D8CFE8] bg-white px-3 py-2.5 text-[0.92rem] font-medium text-[#16024A] outline-none ring-[#3B05C4]/25 placeholder:font-normal placeholder:text-[#5C5478] focus:border-[#3B05C4] focus:ring-2 disabled:opacity-60"
              />
            </label>
          </div>

          {error ? (
            <p className="mt-2 text-[0.78rem] font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-3 flex flex-col gap-2">
            <button
              type="submit"
              disabled={pending || waiting}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-mint px-4 text-[0.88rem] font-semibold text-white disabled:opacity-60"
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Download className="h-4 w-4" aria-hidden />
              )}
              {pending
                ? "Unlocking…"
                : waiting
                  ? `Try again in ${retryIn}s`
                  : "Download Free Package"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                resetFormChrome();
              }}
              className="text-[0.78rem] font-semibold text-neutral-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
