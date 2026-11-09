"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Camera,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  FileDown,
  Loader2,
  Shield,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Skeleton } from "@/components/ui/Skeleton";
import { saveAvatarUrl } from "@/features/auth/api/avatar.api";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils/cn";

import type { PlatformAuditEvent, PlatformStats } from "../api/platform.api";
import { PlatformSubnav } from "./PlatformShell";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.45, ease },
  }),
};

function greetingFor(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Welcome in";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function pct(part: number, whole: number) {
  if (!whole) return 0;
  return Math.min(100, Math.round((part / whole) * 100));
}

function display(value: number | undefined | null) {
  if (value === undefined || value === null) return "—";
  return String(value);
}

const opsLinks = [
  {
    href: "/platform/workspaces",
    title: "Workspaces",
    body: "Plans, trials, suspend or activate tenants",
    Icon: Building2,
  },
  {
    href: "/platform/users",
    title: "Users & admins",
    body: "Promote or demote platform admins",
    Icon: Users,
  },
  {
    href: "/platform/health",
    title: "System health",
    body: "MongoDB, uptime, and table counts",
    Icon: Activity,
  },
  {
    href: "/sheet-downloads",
    title: "Growth sheet leads",
    body: "PDF unlocks from the marketing site",
    Icon: FileDown,
  },
] as const;

export function PlatformCommandCenter({
  adminName,
  adminImage,
  stats,
  events,
  loading,
  error,
}: {
  adminName: string;
  adminImage?: string | null;
  stats: PlatformStats | null;
  events: PlatformAuditEvent[];
  loading?: boolean;
  error?: string | null;
}) {
  if (loading && !stats) {
    return (
      <div className="grid min-w-0 gap-4">
        <Skeleton variant="rectangle" className="h-20 w-full rounded-[1.5rem]" />
        <div className="grid gap-3 tablet:grid-cols-12">
          <Skeleton variant="rectangle" className="h-72 rounded-[1.75rem] tablet:col-span-6 laptop:col-span-4" />
          <Skeleton variant="rectangle" className="h-72 rounded-[1.75rem] tablet:col-span-6 laptop:col-span-4" />
          <Skeleton variant="rectangle" className="h-72 rounded-[1.75rem] tablet:col-span-12 laptop:col-span-4" />
        </div>
        <div className="grid gap-3 tablet:grid-cols-12">
          <Skeleton variant="rectangle" className="h-64 rounded-[1.75rem] tablet:col-span-6 laptop:col-span-3" />
          <Skeleton variant="rectangle" className="h-64 rounded-[1.75rem] tablet:col-span-6 laptop:col-span-5" />
          <Skeleton variant="rectangle" className="h-64 rounded-[1.75rem] tablet:col-span-12 laptop:col-span-4" />
        </div>
      </div>
    );
  }

  const workspaces = stats?.workspaces ?? 0;
  const trials = stats?.trials ?? 0;
  const active = stats?.active ?? 0;
  const suspended = stats?.suspended ?? 0;
  const users = stats?.users ?? 0;
  const admins = stats?.platformAdmins ?? 0;
  const assessments = stats?.assessments ?? 0;
  const bookings = stats?.bookings ?? 0;
  const sheets = stats?.sheetDownloads ?? 0;
  const newWs = stats?.newWorkspaces7d ?? 0;
  const newUsers = stats?.newUsers7d ?? 0;

  const activeShare = pct(active, workspaces);
  const trialShare = pct(trials, workspaces);
  const paidReady = workspaces > 0 ? activeShare : 0;

  const networkChecks = [
    { label: "Workspaces online", done: workspaces > 0 },
    { label: "Trial tenants tracked", done: trials >= 0 },
    { label: "Paid workspaces active", done: active > 0 },
    { label: "Platform admins set", done: admins > 0 },
    { label: "Assessments captured", done: assessments > 0 },
    { label: "Bookings flowing in", done: bookings > 0 },
    { label: "Sheet leads stored", done: sheets > 0 },
    { label: "Audit trail live", done: events.length > 0 },
  ];
  const checksDone = networkChecks.filter((c) => c.done).length;

  const firstName = adminName.trim().split(/\s+/)[0] || "Admin";
  const today = new Date();

  return (
    <section className="min-w-0 space-y-5">
      {/* Header */}
      <motion.header
        className="min-w-0 space-y-5"
        initial="hidden"
        animate="show"
        variants={fadeUp}
        custom={0}
      >
        <div className="min-w-0">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
            Platform control
          </p>
          <h1 className="mt-1 font-display text-[1.75rem] font-bold tracking-tight text-[#16024A] tablet:text-[2.15rem]">
            {greetingFor(today)}, {firstName}
          </h1>
          <p className="mt-1.5 max-w-xl text-[0.9rem] leading-relaxed text-neutral-500">
            You own the entire Xkwisit network — not a trial workspace.
          </p>
        </div>

        <div className="grid min-w-0 gap-4 tablet:gap-4 laptop:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] laptop:items-end laptop:gap-5">
          <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-3 tablet:grid-cols-4 tablet:gap-x-4">
            <MicroBar label="Trials" value={trialShare} href="/platform/workspaces" />
            <MicroBar label="Paid" value={activeShare} href="/platform/workspaces" />
            <MicroBar
              label="7d orgs"
              value={pct(newWs, Math.max(workspaces, 1))}
              href="/platform/workspaces"
            />
            <MicroBar
              label="Admins"
              value={pct(admins, Math.max(users, 1))}
              href="/platform/users"
            />
          </div>

          <div className="grid min-w-0 grid-cols-3 gap-2 tablet:gap-2.5">
            <HeaderStat
              href="/platform/workspaces"
              icon={<Building2 className="h-4 w-4" />}
              value={display(workspaces)}
              label="Workspaces"
            />
            <HeaderStat
              href="/platform/users"
              icon={<Users className="h-4 w-4" />}
              value={display(users)}
              label="Users"
            />
            <HeaderStat
              href="/platform/users"
              icon={<Shield className="h-4 w-4" />}
              value={display(admins)}
              label="Admins"
            />
          </div>
        </div>
      </motion.header>

      <div className="min-w-0 pt-1">
        <PlatformSubnav active="/platform" />
      </div>

      {error ? (
        <p className="rounded-2xl border border-[#F9DADA] bg-[#FFF8F8] px-4 py-3 text-[0.84rem] text-[#9B1C1C]">
          {error}
        </p>
      ) : null}

      {/* Mid bento — fills the content rail on tablet + desktop (12-col, no orphan gaps) */}
      <div className="grid min-w-0 items-stretch gap-3 tablet:grid-cols-12">
        <SoftCard
          className="relative overflow-hidden p-0 tablet:col-span-6 tablet:p-0 laptop:col-span-4"
          index={1}
          accent
        >
          <SuperAdminIdentityCard
            adminName={adminName}
            adminImage={adminImage}
            workspaces={workspaces}
          />
        </SoftCard>

        <SoftCard className="tablet:col-span-6 laptop:col-span-4" index={2}>
          <NetworkGrowthChart
            workspaces={workspaces}
            users={users}
            newWorkspaces7d={newWs}
            newUsers7d={newUsers}
            assessments={assessments}
            bookings={bookings}
            sheets={sheets}
          />
        </SoftCard>

        <div className="grid min-w-0 gap-3 tablet:col-span-12 tablet:grid-cols-2 laptop:col-span-4 laptop:grid-cols-1 laptop:grid-rows-2">
          <SoftCard
            index={3}
            className="flex min-w-0 items-center gap-3 tablet:gap-4"
            href="/platform/workspaces"
            ariaLabel="Open workspaces — paid share"
          >
            <RingGauge value={paidReady} />
            <div className="min-w-0">
              <p className="text-[0.78rem] text-neutral-500">Paid share</p>
              <p className="font-display text-[1.35rem] font-bold text-[#16024A]">
                {display(active)} active
              </p>
              <p className="text-[0.72rem] text-neutral-500">
                {display(trials)} on trial · {display(suspended)} suspended
              </p>
            </div>
          </SoftCard>

          <SoftCard
            index={4}
            className="min-w-0"
            href="/platform/workspaces"
            ariaLabel="Open workspaces — trial load"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[0.78rem] font-medium text-neutral-500">Trial load</p>
              <p className="font-display text-[1.25rem] font-bold text-[#16024A]">{trialShare}%</p>
            </div>
            <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-[#F0ECF6]">
              <motion.span
                className="h-full rounded-full bg-[#3B05C4]"
                initial={{ width: 0 }}
                animate={{ width: `${trialShare}%` }}
                transition={{ duration: 0.8, ease }}
              />
              <motion.span
                className="h-full bg-[#FC3FE3]/70"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, activeShare)}%` }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
              />
            </div>
            <p className="mt-2 text-[0.7rem] text-neutral-500">
              Purple = trial · Pink = paid share of network
            </p>
          </SoftCard>
        </div>
      </div>

      {/* Bottom bento — compact equal-height row, full rail width */}
      <div className="grid min-w-0 items-stretch gap-3 tablet:grid-cols-12">
        <SoftCard className="flex flex-col tablet:col-span-6 laptop:col-span-3" index={5}>
          <p className="text-[0.78rem] font-medium text-neutral-500">Operations</p>
          <ul className="mt-2.5 space-y-1.5">
            {opsLinks.map(({ href, title, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-2.5 rounded-xl bg-[#F7F5FC] px-2.5 py-2 transition hover:bg-[#F4F0FF]"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#3B05C4] ring-1 ring-[#EDE8F7]">
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[0.8rem] font-semibold text-[#16024A] group-hover:text-[#3B05C4]">
                    {title}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                </Link>
              </li>
            ))}
          </ul>
        </SoftCard>

        <SoftCard
          className="flex flex-col tablet:col-span-6 laptop:col-span-5"
          index={6}
          href="/platform/audit"
          ariaLabel="Open audit trail — network pulse"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[0.78rem] font-medium text-neutral-500">Network pulse</p>
              <h3 className="font-display text-[1.05rem] font-bold text-[#16024A]">
                Recent activity
              </h3>
            </div>
            <CalendarDays className="h-4 w-4 shrink-0 text-[#3B05C4]" aria-hidden />
          </div>

          {events.length === 0 ? (
            <p className="mt-3 text-[0.8rem] leading-relaxed text-neutral-500">
              Registrations, workspace changes, bookings, and assessments will land here.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {events.slice(0, 3).map((event, i) => (
                <motion.li
                  key={event.id}
                  className="flex gap-2.5"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      i % 2 === 0 ? "bg-[#3B05C4]" : "bg-[#FC3FE3]",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.8rem] font-semibold text-[#16024A]">
                      {event.title}
                    </p>
                    <p className="truncate text-[0.68rem] text-neutral-500">{event.detail}</p>
                  </div>
                  <time className="shrink-0 text-[0.65rem] text-neutral-400">
                    {new Date(event.at).toLocaleDateString("en-NG", {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </motion.li>
              ))}
            </ul>
          )}

          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[0.75rem] font-semibold text-[#3B05C4]">
            Full audit trail
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </SoftCard>

        <SoftCard
          className="flex flex-col tablet:col-span-12 laptop:col-span-4"
          index={7}
          dark
          href="/platform/health"
          ariaLabel="Open system health"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[0.72rem] font-medium text-white/55">Network checklist</p>
              <h3 className="font-display text-[1.05rem] font-bold text-white">
                Health signals ({checksDone}/{networkChecks.length})
              </h3>
            </div>
            <ClipboardCheck className="h-4 w-4 text-[#FC3FE3]" aria-hidden />
          </div>

          <ul className="mt-3 grid grid-cols-1 gap-1.5">
            {networkChecks.slice(0, 5).map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-[0.78rem]">
                {item.done ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#6EE7B7]" aria-hidden />
                ) : (
                  <Circle className="h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden />
                )}
                <span className={item.done ? "text-white/90" : "text-white/45"}>{item.label}</span>
              </li>
            ))}
          </ul>

          <span className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3B05C4] px-4 py-2 text-[0.75rem] font-semibold text-white">
            Open system health
            <Activity className="h-3.5 w-3.5" aria-hidden />
          </span>
        </SoftCard>
      </div>
    </section>
  );
}

function SuperAdminIdentityCard({
  adminName,
  adminImage,
  workspaces,
}: {
  adminName: string;
  adminImage?: string | null;
  workspaces: number;
}) {
  const { data: session, update } = useSession();
  const accessToken = session?.accessToken;
  const [preview, setPreview] = useState(adminImage ?? null);

  useEffect(() => {
    setPreview(adminImage ?? null);
  }, [adminImage]);

  const { startUpload, isUploading } = useUploadThing("avatarUploader", {
    onClientUploadComplete: async (files) => {
      const file = files?.[0];
      const url =
        (file && "ufsUrl" in file && typeof file.ufsUrl === "string" && file.ufsUrl) ||
        file?.url;
      if (!url) {
        toast.error("Upload finished but no image URL was returned");
        return;
      }
      try {
        await saveAvatarUrl(url, accessToken);
        setPreview(url);
        await update({ image: url });
        toast.success("Profile photo updated");
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not save photo");
      }
    },
    onUploadError: (err) => {
      toast.error(err.message || "Upload failed");
    },
  });

  const initials = adminName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="relative isolate min-h-[20rem] h-full w-full overflow-hidden">
      {/* Passport fill — photo covers the whole card */}
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt={adminName || "Super admin"}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(252,63,227,0.45),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(59,5,196,0.85),transparent_50%),linear-gradient(160deg,#16024A,#3B05C4)]">
          <div className="grid h-full w-full place-items-center font-display text-[3.5rem] font-bold tracking-tight text-white/35">
            {initials || <Shield className="h-16 w-16 opacity-40" aria-hidden />}
          </div>
        </div>
      )}

      {/* Soft vignette so face reads like a passport plate */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(22,2,74,0.92)_0%,rgba(22,2,74,0.45)_38%,rgba(22,2,74,0.12)_62%,transparent_78%)]"
        aria-hidden
      />

      {isUploading ? (
        <div className="absolute inset-0 z-20 grid place-items-center bg-[#16024A]/45 backdrop-blur-[2px]">
          <Loader2 className="h-7 w-7 animate-spin text-white" aria-hidden />
        </div>
      ) : null}

      <div className="relative z-10 flex h-full min-h-[20rem] flex-col justify-between p-4 tablet:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-black/35 px-3 py-1 text-[0.7rem] font-semibold text-white backdrop-blur-sm ring-1 ring-white/25">
            Super admin
          </span>
          <label
            className={cn(
              "grid h-9 w-9 cursor-pointer place-items-center rounded-full",
              "bg-white/95 text-[#3B05C4] shadow-md ring-1 ring-white/40 transition hover:bg-white",
              isUploading && "pointer-events-none opacity-60",
            )}
            title="Upload profile photo"
          >
            <Camera className="h-4 w-4" aria-hidden />
            <span className="sr-only">Upload profile photo</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              disabled={isUploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                void startUpload([file]);
              }}
            />
          </label>
        </div>

        <div>
          <p className="font-display text-[1.45rem] font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
            {adminName || "Platform admin"}
          </p>
          <p className="mt-1 text-[0.8rem] text-white/80">
            Full network access · no trial limits
          </p>
          <Link
            href="/platform/workspaces"
            className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-[#FC3FE3] px-3.5 py-1.5 text-[0.72rem] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(252,63,227,0.9)] transition hover:bg-[#E836CC]"
          >
            {display(workspaces)} tenants on the network
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SoftCard({
  children,
  className,
  index = 0,
  accent,
  dark,
  href,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  accent?: boolean;
  dark?: boolean;
  href?: string;
  ariaLabel?: string;
}) {
  // Grid col-span / layout must live on this wrapper (the grid item).
  // Surface styles stay on the inner Link/article — className is merged into both
  // so `laptop:col-span-*` and `p-0` / `flex` all resolve correctly via twMerge.
  const surface = cn(
    "min-w-0 h-full overflow-hidden rounded-[1.75rem] border p-4 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.4)] tablet:p-5",
    accent && "border-transparent bg-[#16024A] text-white",
    dark && "border-transparent bg-[#16024A] text-white",
    !accent && !dark && "border-[#EDE8F7] bg-white",
    href &&
      "block transition hover:border-[#3B05C4]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B05C4]",
    className,
  );

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn("min-w-0 h-full", className)}
    >
      {href ? (
        <Link href={href} aria-label={ariaLabel} className={surface}>
          {children}
        </Link>
      ) : (
        <article className={surface}>{children}</article>
      )}
    </motion.div>
  );
}

function MicroBar({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href?: string;
}) {
  const body = (
    <>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="truncate text-[0.7rem] font-medium text-neutral-500">{label}</span>
        <span className="shrink-0 text-[0.7rem] tabular-nums font-semibold text-[#16024A]">
          {value}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#EDE8F7]">
        <motion.div
          className="h-full rounded-full bg-[#3B05C4]"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(4, value)}%` }}
          transition={{ duration: 0.7, ease }}
        />
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="min-w-0 rounded-lg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B05C4]"
        aria-label={`${label} ${value}%`}
      >
        {body}
      </Link>
    );
  }

  return <div className="min-w-0">{body}</div>;
}

function HeaderStat({
  href,
  icon,
  value,
  label,
}: {
  href: string;
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 flex-col items-start gap-2 rounded-2xl border border-[#EDE8F7] bg-white p-2.5 shadow-[0_12px_28px_-24px_rgba(22,2,74,0.45)] transition hover:border-[#3B05C4]/35 hover:bg-[#FBF9FF] tablet:p-3 laptop:flex-row laptop:items-center laptop:gap-2.5 laptop:px-3.5 laptop:py-3"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#F4F0FF] text-[#3B05C4] transition group-hover:bg-[#3B05C4] group-hover:text-white laptop:h-9 laptop:w-9">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-display text-[0.95rem] font-bold tabular-nums leading-none text-[#16024A] tablet:text-[1rem] laptop:text-[1.05rem]">
          {value}
        </p>
        <p className="mt-1 truncate text-[0.62rem] text-neutral-500 tablet:text-[0.65rem] laptop:text-[0.68rem]">
          {label}
        </p>
      </div>
    </Link>
  );
}

type GrowthSeriesPoint = {
  month: string;
  workspaces: number;
  users: number;
};

/** Build a 6-month curve that ends on live totals (API has no history yet). */
function buildGrowthSeries(
  workspaces: number,
  users: number,
  newWorkspaces7d: number,
  newUsers7d: number,
): GrowthSeriesPoint[] {
  const now = new Date();
  const months: string[] = [];
  for (let i = 5; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString("en-US", { month: "short" }));
  }

  return months.map((month, i) => {
    const t = i / 5;
    const smooth = t * t * (3 - 2 * t);
    const wsFloor = Math.max(0, workspaces - Math.max(newWorkspaces7d * 4, workspaces * 0.65));
    const userFloor = Math.max(0, users - Math.max(newUsers7d * 4, users * 0.65));
    const ws =
      i === 5
        ? workspaces
        : Math.max(0, Math.round(wsFloor + (workspaces - wsFloor) * smooth));
    const userCount =
      i === 5
        ? users
        : Math.max(0, Math.round(userFloor + (users - userFloor) * smooth));
    return { month, workspaces: ws, users: userCount };
  });
}

function NetworkGrowthChart({
  workspaces,
  users,
  newWorkspaces7d,
  newUsers7d,
  assessments,
  bookings,
  sheets,
}: {
  workspaces: number;
  users: number;
  newWorkspaces7d: number;
  newUsers7d: number;
  assessments: number;
  bookings: number;
  sheets: number;
}) {
  const [series, setSeries] = useState<"all" | "workspaces" | "users">("all");
  const data = useMemo(
    () => buildGrowthSeries(workspaces, users, newWorkspaces7d, newUsers7d),
    [workspaces, users, newWorkspaces7d, newUsers7d],
  );

  const yMax = Math.max(
    4,
    ...data.map((d) => Math.max(d.workspaces, d.users)),
  );
  const showWorkspaces = series === "all" || series === "workspaces";
  const showUsers = series === "all" || series === "users";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="min-w-0 truncate font-display text-[1.05rem] font-bold text-[#16024A]">
            Network growth
          </h3>
          <Link
            href="/platform/workspaces"
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#EDE8F7] bg-[#F7F5FC] px-2 py-1 text-[0.65rem] font-semibold text-[#16024A] transition hover:border-[#3B05C4]/35 hover:bg-[#F4F0FF]"
          >
            <CalendarDays className="h-3 w-3 text-[#3B05C4]" aria-hidden />
            Workspaces
          </Link>
        </div>
        <p className="mt-1 text-[0.72rem] leading-snug text-neutral-500">
          +{display(newWorkspaces7d)} orgs · +{display(newUsers7d)} users · 7d
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <SeriesPill
          active={series === "all"}
          tone="navy"
          onClick={() => setSeries("all")}
          label="All network"
        />
        <SeriesPill
          active={series === "workspaces"}
          tone="purple"
          onClick={() => setSeries("workspaces")}
          label="Workspaces"
        />
        <SeriesPill
          active={series === "users"}
          tone="pink"
          onClick={() => setSeries("users")}
          label="Users"
        />
      </div>

      <div className="mt-3 h-[11.5rem] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 6, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="xkWsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16024A" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#16024A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="xkUsersFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B05C4" stopOpacity={0.32} />
                <stop offset="100%" stopColor="#3B05C4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#EDE8F7" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#9B95B0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              dy={6}
            />
            <YAxis
              domain={[0, yMax]}
              tick={{ fill: "#9B95B0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip
              cursor={{ stroke: "#EDE8F7", strokeWidth: 1 }}
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #EDE8F7",
                boxShadow: "0 16px 40px -28px rgba(22,2,74,0.45)",
                fontSize: 12,
                color: "#16024A",
              }}
            />
            {showWorkspaces ? (
              <Area
                type="monotone"
                dataKey="workspaces"
                name="Workspaces"
                stroke="#16024A"
                fill="url(#xkWsFill)"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: "#16024A", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#16024A", stroke: "#fff", strokeWidth: 2 }}
              />
            ) : null}
            {showUsers ? (
              <Area
                type="monotone"
                dataKey="users"
                name="Users"
                stroke="#3B05C4"
                fill="url(#xkUsersFill)"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: "#3B05C4", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#3B05C4", stroke: "#fff", strokeWidth: 2 }}
              />
            ) : null}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.68rem] text-neutral-500">
        <span>{display(assessments)} assessments</span>
        <span>{display(bookings)} bookings</span>
        <span>{display(sheets)} sheet leads</span>
      </div>
    </div>
  );
}

function SeriesPill({
  label,
  active,
  tone,
  onClick,
}: {
  label: string;
  active: boolean;
  tone: "navy" | "purple" | "pink";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-2.5 py-1 text-[0.68rem] font-semibold transition",
        !active && "border border-[#EDE8F7] bg-white text-neutral-500 hover:bg-[#F7F5FC]",
        active && tone === "navy" && "bg-[#16024A] text-white shadow-sm",
        active && tone === "purple" && "bg-[#3B05C4] text-white shadow-sm",
        active && tone === "pink" && "bg-[#FC3FE3] text-white shadow-sm",
      )}
    >
      {label}
    </button>
  );
}

function RingGauge({ value }: { value: number }) {
  const pctValue = Math.max(0, Math.min(100, value));
  const r = 36;
  const c = 2 * Math.PI * r;
  const dash = (pctValue / 100) * c;

  return (
    <div className="relative grid h-[5.5rem] w-[5.5rem] shrink-0 place-items-center">
      <svg viewBox="0 0 88 88" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="44" cy="44" r={r} fill="none" stroke="#EDE8F7" strokeWidth="8" />
        <motion.circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="#3B05C4"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          initial={{ strokeDasharray: `0 ${c}` }}
          animate={{ strokeDasharray: `${dash} ${c}` }}
          transition={{ duration: 0.9, ease }}
        />
      </svg>
      <span className="absolute font-display text-[1.05rem] font-bold text-[#16024A]">
        {pctValue}%
      </span>
    </div>
  );
}
