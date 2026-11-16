"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  fetchMyProfile,
  updateMyProfile,
} from "@/features/auth/api/profile.api";
import { ApiRequestError } from "@/lib/api/errors";
import { cn } from "@/lib/utils/cn";

const PHONE_RE = /^\+?[1-9]\d{7,14}$/;

function normalizePhone(raw: string) {
  return raw.replace(/[\s().-]/g, "").trim();
}

const fieldClass =
  "w-full rounded-2xl border border-[#E8E0F5] bg-white px-4 py-3 text-[0.92rem] text-[#16024A] outline-none transition placeholder:text-[#9B94B0] focus:border-mint focus:ring-2 focus:ring-mint/20 disabled:cursor-not-allowed disabled:bg-[#F7F4FF] disabled:text-[#6B6484]";

/**
 * Edit name, business name, and phone. Email is shown read-only.
 */
export function ProfileSettingsForm({
  className,
}: {
  className?: string;
}) {
  const { update } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMyProfile();
        if (cancelled) return;
        setEmail(data.user.email);
        setFirstName(data.user.firstName ?? "");
        setLastName(data.user.lastName ?? "");
        setPhone(data.user.phone ?? "");
        setCompanyName(data.organization?.name ?? "");
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof ApiRequestError
            ? err.message
            : "Could not load your profile.";
        setError(message);
        toast.error(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const first = firstName.trim();
    const last = lastName.trim();
    const company = companyName.trim();
    const normalized = normalizePhone(phone);

    if (!first || !last) {
      const msg = "Enter both your first and last name.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (first.toLowerCase() === last.toLowerCase()) {
      const msg = "Enter both your first and last name.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!company) {
      const msg = "Business name is required.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!PHONE_RE.test(normalized)) {
      const msg = "Enter a valid phone number (e.g. +2348012345678).";
      setError(msg);
      toast.error(msg);
      return;
    }

    setSaving(true);
    try {
      const data = await updateMyProfile({
        firstName: first,
        lastName: last,
        phone: normalized,
        companyName: company,
      });

      const fullName = data.user.fullName;
      await update({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        fullName,
        name: fullName,
      });

      setFirstName(data.user.firstName);
      setLastName(data.user.lastName);
      setPhone(data.user.phone ?? normalized);
      setCompanyName(data.organization?.name ?? company);
      toast.success("Profile updated");
    } catch (err) {
      const message =
        err instanceof ApiRequestError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Could not save your profile.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div
        className={cn(
          "flex min-h-[16rem] items-center justify-center rounded-[1.5rem] border border-[#EEEAF8] bg-white",
          className,
        )}
      >
        <Loader2 className="h-5 w-5 animate-spin text-mint" aria-hidden />
        <span className="sr-only">Loading profile</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-[1.5rem] border border-[#EEEAF8] bg-white p-5 shadow-[0_18px_40px_-32px_rgba(22,2,74,0.28)] mobile-sm:p-6 tablet:p-7",
        className,
      )}
    >
      <div className="max-w-xl space-y-5">
        <div>
          <h2 className="font-display text-[1.15rem] font-bold text-[#16024A]">
            Your details
          </h2>
          <p className="mt-1 text-[0.88rem] text-[#6B6484]">
            Update your name, business, and phone. Email cannot be changed.
          </p>
        </div>

        <label className="block space-y-1.5">
          <span className="text-[0.78rem] font-semibold text-[#16024A]">
            Email
          </span>
          <input
            type="email"
            value={email}
            readOnly
            disabled
            className={fieldClass}
            autoComplete="email"
          />
          <span className="text-[0.72rem] text-[#8B849E]">
            Contact support if you need to change your login email.
          </span>
        </label>

        <div className="grid gap-4 tablet:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-[0.78rem] font-semibold text-[#16024A]">
              First name
            </span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={fieldClass}
              autoComplete="given-name"
              required
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-[0.78rem] font-semibold text-[#16024A]">
              Last name
            </span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={fieldClass}
              autoComplete="family-name"
              required
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-[0.78rem] font-semibold text-[#16024A]">
            Business name
          </span>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className={fieldClass}
            autoComplete="organization"
            required
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[0.78rem] font-semibold text-[#16024A]">
            Phone number
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
            autoComplete="tel"
            placeholder="+2348012345678"
            required
          />
        </label>

        {error ? (
          <p
            className="rounded-2xl bg-red-50 px-4 py-3 text-[0.84rem] text-red-700"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-mint px-6 text-[0.9rem] font-semibold text-white transition hover:bg-mint-deep disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Saving…
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </form>
  );
}
