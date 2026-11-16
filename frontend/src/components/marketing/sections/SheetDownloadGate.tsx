"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Download, Loader2 } from "lucide-react";

import { BotShieldFields } from "@/components/security/BotShieldFields";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  createSheetDownload,
  sheetDownloadFileUrl,
  type SheetDownloadAssetKey,
} from "@/features/sheet-downloads/api/sheet-downloads.api";
import { trackActivity } from "@/lib/activity/track";
import { ApiRequestError } from "@/lib/api/errors";
import { useBotShield } from "@/lib/bot-shield/useBotShield";
import { cn } from "@/lib/utils/cn";

const RETRY_WAIT_SECONDS = 30;

const ASSET_FILES: Record<SheetDownloadAssetKey, string> = {
  "growth-strategy": "XKWISIT_BUSINESS_GROWTH_STRATEGY.pdf",
  "launch-brand-playbook": "XKWISIT_LAUNCH_BRAND_PLAYBOOK.pdf",
  "ecommerce-cro-blueprint": "XKWISIT_ECOMMERCE_CRO_BLUEPRINT.pdf",
};

type SheetDownloadGateProps = {
  className?: string;
  buttonClassName?: string;
  label?: string;
  title?: string;
  description?: string;
  assetKey?: SheetDownloadAssetKey;
  /** Kept for callers; modal layout ignores compact density. */
  compact?: boolean;
};

function networkRetryMessage(seconds: number) {
  const unit = seconds === 1 ? "second" : "seconds";
  return `Please, check your internet connection and try again in ${seconds} ${unit}`;
}

/**
 * Collects name, email, and phone before unlocking the growth strategy PDF.
 * Opens as a centered modal (not an inline dropdown).
 */
export function SheetDownloadGate({
  className,
  buttonClassName,
  label = "Download Free Package",
  title = "Unlock your free package",
  description = "Name, email, and phone — then the PDF downloads straight away.",
  assetKey = "growth-strategy",
}: SheetDownloadGateProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [retryIn, setRetryIn] = useState(0);
  const {
    ensureReady: ensureBotShield,
    refresh: refreshBotShield,
    honeypotRef,
  } = useBotShield(open);

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

  function handleOpenChange(next: boolean) {
    if (pending) return;
    setOpen(next);
    if (next) {
      resetFormChrome();
    } else {
      setError(null);
      setRetryIn(0);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (retryIn > 0 || pending) return;

    setError(null);
    setPending(true);

    try {
      const shield = await ensureBotShield();
      const lead = await createSheetDownload({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        assetKey,
        ...shield,
      });

      const fileUrl = sheetDownloadFileUrl(lead.id);
      const fileName = ASSET_FILES[assetKey];
      const anchor = document.createElement("a");
      anchor.href = fileUrl;
      anchor.download = fileName;
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      trackActivity({
        kind: "download",
        target: fileName,
        assetKey,
        href: fileUrl,
        tag: "sheet-download",
      });

      setDone(true);
      setOpen(false);
      setName("");
      setEmail("");
      setPhone("");
      setRetryIn(0);
    } catch (err) {
      void refreshBotShield().catch(() => {});
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
      <button
        type="button"
        onClick={() => handleOpenChange(true)}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-mint-ice px-4 py-2.5 text-[0.88rem] font-semibold text-mint-ink",
          buttonClassName,
        )}
      >
        <Download className="h-4 w-4 shrink-0" aria-hidden />
        <span className="truncate">{done ? "Download again" : label}</span>
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          size="sm"
          className="border-[#E7DEFF] bg-white p-5 mobile-sm:p-6"
        >
          <DialogHeader className="mb-3 pr-8">
            <DialogTitle className="font-display text-[1.15rem] font-bold text-[#16024A]">
              {title}
            </DialogTitle>
            <DialogDescription className="text-[0.85rem] leading-snug text-[#3A3358]">
              {description}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="relative text-left">
            <BotShieldFields honeypotRef={honeypotRef} />
            <div className="grid gap-3">
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
              <p className="mt-3 text-[0.78rem] font-medium text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-4 flex flex-col gap-2">
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
                    : label}
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => handleOpenChange(false)}
                className="text-[0.78rem] font-semibold text-neutral-500 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
