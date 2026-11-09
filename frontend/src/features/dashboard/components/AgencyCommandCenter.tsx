"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Fingerprint,
  Plus,
  RefreshCw,
  Shield,
  Users,
  Wallet,
} from "lucide-react";

import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { cn } from "@/lib/utils/cn";

import type {
  ActivityItem,
  AttentionItem,
  DashboardMember,
  DashboardOverview,
} from "../types";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.04 * i, duration: 0.45, ease },
  }),
};

function greetingFor(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Hello";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function roleLabel(role: string) {
  return role.replaceAll("_", " ").toLowerCase();
}

export function AgencyCommandCenter({
  overview,
  loading,
  error,
  onRetry,
  retrying,
}: {
  overview?: DashboardOverview | null;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  retrying?: boolean;
}) {
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="grid min-w-0 gap-4">
        <Skeleton variant="rectangle" className="h-16 w-full rounded-[1.5rem]" />
        <div className="grid grid-cols-2 gap-3 laptop:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangle" className="h-32 w-full rounded-[1.5rem]" />
          ))}
        </div>
        <div className="grid gap-3 laptop:grid-cols-12">
          <Skeleton variant="rectangle" className="h-72 w-full rounded-[1.75rem] laptop:col-span-5" />
          <Skeleton variant="rectangle" className="h-72 w-full rounded-[1.75rem] laptop:col-span-4" />
          <Skeleton variant="rectangle" className="h-72 w-full rounded-[1.75rem] laptop:col-span-3" />
        </div>
        <div className="grid gap-3 laptop:grid-cols-12">
          <Skeleton variant="rectangle" className="h-56 w-full rounded-[1.75rem] laptop:col-span-4" />
          <Skeleton variant="rectangle" className="h-56 w-full rounded-[1.75rem] laptop:col-span-5" />
          <Skeleton variant="rectangle" className="h-56 w-full rounded-[1.75rem] laptop:col-span-3" />
        </div>
      </div>
    );
  }

  const currency = overview?.currency ?? "NGN";
  const projects = overview?.activeProjects ?? 0;
  const pipeline = overview?.pipelineValue ?? 0;
  const revenue = overview?.revenueMtd ?? 0;
  const team = overview?.teamUtilization ?? 0;
  const members = overview?.members ?? [];
  const memberCount = overview?.memberCount ?? members.length;
  const seats = overview?.seatsIncluded ?? 0;
  const openLeads = overview?.openLeads ?? 0;
  const openTasks = overview?.openTasks ?? 0;
  const attention = overview?.attention ?? [];
  const activity = overview?.recentActivity ?? [];
  const highAttention =
    overview?.highAttention ?? attention.filter((a) => a.severity === "HIGH").length;
  const orgName = overview?.organization?.name?.trim() || "Workspace";
  const seatsFree = Math.max(0, seats - memberCount);

  const fullName = (
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    ""
  ).trim();
  const firstName = (user?.firstName || fullName.split(/\s+/)[0] || "").trim();
  const today = new Date();

  return (
    <section className="min-w-0 space-y-5">
      <motion.header
        className="flex flex-col gap-4 laptop:flex-row laptop:items-end laptop:justify-between"
        initial="hidden"
        animate="show"
        variants={fadeUp}
        custom={0}
      >
        <div className="min-w-0">
          <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-[#16024A] tablet:text-[2rem]">
            {greetingFor(today)}
            {firstName ? `, ${firstName}` : ""}!
          </h1>
          <p className="mt-1 max-w-xl text-[0.9rem] text-neutral-500">
            Explore live delivery, capacity, and pipeline for{" "}
            <span className="font-medium text-[#16024A]">{orgName}</span>.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#3B05C4] px-4 py-2.5 text-[0.8rem] font-semibold text-white shadow-[0_14px_32px_-16px_rgba(59,5,196,0.7)] transition hover:bg-[#2C0494]"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
          New project
        </Link>
      </motion.header>

      {error && !overview ? (
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-[#F9DADA] bg-[#FFF8F8] px-4 py-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-[0.84rem] text-[#9B1C1C]">
            Workspace metrics could not be loaded. Check your connection and try again.
          </p>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              disabled={retrying}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.75rem] font-semibold text-[#16024A] ring-1 ring-[#F2CACA] transition hover:bg-[#FFF1F1] disabled:opacity-60"
            >
              <RefreshCw
                className={cn("h-3.5 w-3.5", retrying && "animate-spin")}
                aria-hidden
              />
              {retrying ? "Retrying…" : "Refresh"}
            </button>
          ) : null}
        </motion.div>
      ) : null}

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 laptop:grid-cols-4">
        <KpiCard
          index={1}
          href="/finance/payments"
          ariaLabel="Open payments — collected this month"
          label="Collected this month"
          value={formatCurrencyCompact(revenue, currency)}
          hint="Fees already in"
          chart={<MiniBars values={[revenue || 2, revenue * 0.7 || 1.4, revenue * 1.1 || 2.2, revenue * 0.85 || 1.7, revenue * 1.3 || 2.6, revenue || 2]} />}
        />
        <KpiCard
          index={2}
          href="/crm/leads"
          ariaLabel="Open leads"
          label="Open leads"
          value={String(openLeads)}
          hint={openLeads === 0 ? "Queue clear" : "In CRM"}
          chart={<Sparkline active={openLeads > 0} />}
        />
        <KpiCard
          index={3}
          href="/crm/pipeline"
          ariaLabel="Open pipeline"
          label="Pipeline"
          value={formatCurrencyCompact(pipeline, currency)}
          hint="Weighted opportunity"
          icon={<Wallet className="h-5 w-5 text-[#3B05C4]" />}
        />
        <KpiCard
          index={4}
          href="/approvals"
          ariaLabel="Open approvals — at risk"
          label="At risk"
          value={String(highAttention)}
          hint={highAttention ? "Needs intervention" : "AI watching"}
          accent
          chart={<WaveMark />}
        />
      </div>

      {/* Mid row */}
      <div className="grid min-w-0 gap-3 laptop:grid-cols-12">
        <CapacityBalanceCard
          className="laptop:col-span-5"
          utilization={team}
          seats={seats}
          memberCount={memberCount}
          seatsFree={seatsFree}
        />
        <DeliveryGaugeCard
          className="laptop:col-span-4"
          projects={projects}
          utilization={team}
          openTasks={openTasks}
        />
        <WorkspaceProfileCard
          className="laptop:col-span-3"
          orgName={orgName}
          projects={projects}
          members={memberCount}
          seats={seats}
        />
      </div>

      {/* Bottom row */}
      <div className="grid min-w-0 gap-3 laptop:grid-cols-12">
        <ProjectStackCard
          className="laptop:col-span-4"
          projects={projects}
          pipeline={pipeline}
          currency={currency}
        />
        <ActivityTransfersCard
          className="laptop:col-span-5"
          attention={attention}
          activity={activity}
          members={members}
        />
        <SecurityCard className="laptop:col-span-3" />
      </div>
    </section>
  );
}

function SoftCard({
  children,
  className,
  index = 0,
  accent,
  href,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  accent?: boolean;
  href?: string;
  ariaLabel?: string;
}) {
  // Grid col-span must live on the motion wrapper (the actual grid item).
  const surface = cn(
    "min-w-0 h-full overflow-hidden rounded-[1.75rem] border p-5 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.4)]",
    accent
      ? "border-transparent bg-[#16024A] text-white"
      : "border-[#EDE8F7] bg-white",
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

function KpiCard({
  index,
  label,
  value,
  hint,
  chart,
  icon,
  accent,
  href,
  ariaLabel,
}: {
  index: number;
  label: string;
  value: string;
  hint: string;
  chart?: ReactNode;
  icon?: ReactNode;
  accent?: boolean;
  href?: string;
  ariaLabel?: string;
}) {
  return (
    <SoftCard index={index} accent={accent} href={href} ariaLabel={ariaLabel}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={cn(
              "text-[0.78rem] font-medium",
              accent ? "text-white/65" : "text-neutral-500",
            )}
          >
            {label}
          </p>
          <p
            className={cn(
              "mt-2 break-words font-display text-[1.55rem] font-bold tabular-nums leading-none tracking-tight",
              accent ? "text-white" : "text-[#16024A]",
            )}
          >
            {value}
          </p>
          <p
            className={cn(
              "mt-2 text-[0.72rem]",
              accent ? "text-white/55" : "text-neutral-500",
            )}
          >
            {hint}
          </p>
        </div>
        <div className="shrink-0">
          {chart}
          {icon ? (
            <div
              className={cn(
                "grid h-12 w-12 place-items-center rounded-2xl",
                accent ? "bg-white/10" : "bg-[#F4F0FF]",
              )}
            >
              {icon}
            </div>
          ) : null}
        </div>
      </div>
    </SoftCard>
  );
}

function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-12 items-end gap-1">
      {values.map((v, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-full bg-[#3B05C4]/85"
          initial={{ height: 4 }}
          animate={{ height: Math.max(6, (v / max) * 44) }}
          transition={{ delay: 0.08 * i, duration: 0.5, ease }}
        />
      ))}
    </div>
  );
}

function Sparkline({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 72 40" className="h-12 w-[4.5rem]" aria-hidden>
      <motion.path
        d="M2 28 C12 28, 14 10, 24 14 S38 34, 48 22 62 8, 70 12"
        fill="none"
        stroke={active ? "#3B05C4" : "#C4B5E8"}
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease }}
      />
      <circle cx="70" cy="12" r="3" fill={active ? "#FC3FE3" : "#9B8BC4"} />
    </svg>
  );
}

function WaveMark() {
  return (
    <svg viewBox="0 0 72 40" className="h-12 w-[4.5rem] text-white/70" aria-hidden>
      <motion.path
        d="M2 22 C12 10, 18 34, 28 22 S42 8, 52 20 64 30, 70 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease }}
      />
    </svg>
  );
}

function CapacityBalanceCard({
  className,
  utilization,
  seats,
  memberCount,
  seatsFree,
}: {
  className?: string;
  utilization: number;
  seats: number;
  memberCount: number;
  seatsFree: number;
}) {
  const utilDelta = utilization >= 80 ? -Math.min(12, utilization - 70) : utilization > 0 ? 2.4 : 0;
  const saveDelta = seatsFree > 0 ? 2.45 : seats > 0 ? -1.2 : 0;

  return (
    <SoftCard
      className={cn("flex flex-col", className)}
      index={5}
      href="/team"
      ariaLabel="Open team — capacity balance"
    >
      <div className="grid gap-4 tablet:grid-cols-2">
        <MetricBlock
          label="Open seats"
          value={String(seatsFree)}
          delta={saveDelta}
          suffix={seats ? `of ${seats}` : "unset"}
        />
        <MetricBlock
          label="Seat load"
          value={`${Math.round(utilization)}%`}
          delta={utilDelta}
          invert
        />
      </div>

      <div className="relative mt-6 min-h-[9.5rem] flex-1 overflow-hidden rounded-[1.25rem] bg-[#F7F5FC]">
        <AreaChart fill={Math.max(8, Math.min(100, utilization || 18))} />
        <div className="absolute inset-x-4 bottom-3 flex justify-between text-[0.65rem] font-medium text-neutral-500">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Sun</span>
        </div>
        <p className="absolute left-4 top-3 text-[0.72rem] font-semibold text-[#16024A]">
          {memberCount} member{memberCount === 1 ? "" : "s"} on seats
        </p>
      </div>
    </SoftCard>
  );
}

function MetricBlock({
  label,
  value,
  delta,
  suffix,
  invert,
}: {
  label: string;
  value: string;
  delta: number;
  suffix?: string;
  invert?: boolean;
}) {
  const positive = invert ? delta <= 0 : delta >= 0;
  return (
    <div>
      <p className="text-[0.78rem] text-neutral-500">{label}</p>
      <div className="mt-1 flex flex-wrap items-end gap-2">
        <p className="font-display text-[1.7rem] font-bold leading-none text-[#16024A]">
          {value}
        </p>
        {delta !== 0 ? (
          <span
            className={cn(
              "mb-0.5 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold",
              positive ? "bg-[#E8F8EF] text-[#027A48]" : "bg-[#FEECEC] text-[#B42318]",
            )}
          >
            {delta > 0 ? "+" : ""}
            {delta.toFixed(2)}%
          </span>
        ) : (
          <span className="mb-0.5 rounded-full bg-[#F4F0FF] px-2 py-0.5 text-[0.65rem] font-semibold text-[#3B05C4]">
            steady
          </span>
        )}
      </div>
      {suffix ? <p className="mt-1 text-[0.7rem] text-neutral-500">{suffix}</p> : null}
    </div>
  );
}

function AreaChart({ fill }: { fill: number }) {
  const peak = 20 + (fill / 100) * 55;
  const d = `M0 110 C40 ${120 - peak * 0.35}, 80 ${120 - peak}, 120 ${110 - peak * 0.55} S200 ${100 - peak * 0.2}, 260 ${90 - peak * 0.45} L260 140 L0 140 Z`;
  return (
    <svg viewBox="0 0 260 140" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="xkArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B05C4" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3B05C4" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        fill="url(#xkArea)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.path
        d={`M0 110 C40 ${120 - peak * 0.35}, 80 ${120 - peak}, 120 ${110 - peak * 0.55} S200 ${100 - peak * 0.2}, 260 ${90 - peak * 0.45}`}
        fill="none"
        stroke="#3B05C4"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease }}
      />
    </svg>
  );
}

function DeliveryGaugeCard({
  className,
  projects,
  utilization,
  openTasks,
}: {
  className?: string;
  projects: number;
  utilization: number;
  openTasks: number;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(utilization)));
  const radius = 54;
  const c = 2 * Math.PI * radius;
  const dash = (pct / 100) * c * 0.75;

  return (
    <SoftCard
      className={cn("flex flex-col items-center justify-between", className)}
      index={6}
      href="/projects"
      ariaLabel="Open projects — delivery capacity"
    >
      <div className="w-full text-center">
        <p className="text-[0.78rem] text-neutral-500">Delivery capacity</p>
        <p className="mt-2 font-display text-[2rem] font-bold tabular-nums text-[#16024A]">
          {projects}
        </p>
        <p className="text-[0.75rem] text-neutral-500">active projects</p>
      </div>

      <div className="relative my-2 grid place-items-center">
        <svg viewBox="0 0 140 110" className="h-[7.5rem] w-[9.5rem]" aria-hidden>
          <path
            d="M16 96 A54 54 0 1 1 124 96"
            fill="none"
            stroke="#EDE8F7"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <motion.path
            d="M16 96 A54 54 0 1 1 124 96"
            fill="none"
            stroke="#3B05C4"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
            initial={{ strokeDasharray: `0 ${c}` }}
            animate={{ strokeDasharray: `${dash} ${c}` }}
            transition={{ duration: 0.9, ease }}
          />
        </svg>
        <div className="absolute inset-0 top-6 grid place-items-center">
          <p className="font-display text-[1.65rem] font-bold text-[#16024A]">{pct}%</p>
          <p className="text-[0.68rem] text-neutral-500">utilized</p>
        </div>
      </div>

      <p className="text-center text-[0.75rem] text-neutral-500">
        {openTasks === 0 ? "No open task blockers" : `${openTasks} open tasks in flight`}
      </p>
    </SoftCard>
  );
}

function WorkspaceProfileCard({
  className,
  orgName,
  projects,
  members,
  seats,
}: {
  className?: string;
  orgName: string;
  projects: number;
  members: number;
  seats: number;
}) {
  return (
    <SoftCard
      className={cn("flex flex-col", className)}
      index={7}
      href="/team"
      ariaLabel={`Open team — ${orgName}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#3B05C4] to-[#16024A] text-white shadow-[0_14px_28px_-14px_rgba(59,5,196,0.7)]">
          <Building2 className="h-7 w-7" aria-hidden />
        </div>
        <h3 className="mt-3 line-clamp-2 font-display text-[1.05rem] font-bold text-[#16024A]">
          {orgName}
        </h3>
        <p className="mt-0.5 text-[0.75rem] text-neutral-500">Agency workspace</p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#F0ECF6] pt-4">
        <ProfileStat label="Projects" value={String(projects)} />
        <ProfileStat label="Members" value={String(members)} />
        <ProfileStat label="Seats" value={String(seats)} />
      </div>

      <span className="mt-4 inline-flex items-center justify-center gap-1 rounded-full bg-[#F4F0FF] px-3 py-2 text-[0.75rem] font-semibold text-[#3B05C4]">
        Manage team
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </span>
    </SoftCard>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-[1.05rem] font-bold text-[#16024A]">{value}</p>
      <p className="text-[0.65rem] text-neutral-500">{label}</p>
    </div>
  );
}

function ProjectStackCard({
  className,
  projects,
  pipeline,
  currency,
}: {
  className?: string;
  projects: number;
  pipeline: number;
  currency: string;
}) {
  const layers = [
    { label: "Delivery", tone: "from-[#5B45FF]/90 to-[#3B05C4]/90", rotate: "-rotate-6" },
    { label: "Pipeline", tone: "from-[#FC3FE3]/80 to-[#3B05C4]/70", rotate: "rotate-3" },
    { label: "Live", tone: "from-[#16024A] to-[#2C0494]", rotate: "-rotate-2" },
  ];

  const router = useRouter();

  return (
    <SoftCard className={cn("flex flex-col", className)} index={8}>
      <button
        type="button"
        onClick={() => router.push("/projects")}
        className="flex w-full flex-col text-left"
        aria-label="Open projects — active portfolio"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[0.78rem] font-medium text-neutral-500">Active work in portfolio</p>
            <h3 className="mt-1 font-display text-[1.1rem] font-bold text-[#16024A]">
              {projects} project{projects === 1 ? "" : "s"} live
            </h3>
          </div>
          <Briefcase className="h-4 w-4 text-[#3B05C4]" aria-hidden />
        </div>

        <div className="relative mx-auto mt-6 h-36 w-full max-w-[14rem]">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              className={cn(
                "absolute inset-x-4 h-24 rounded-[1.25rem] bg-gradient-to-br p-4 text-white shadow-lg backdrop-blur-sm",
                layer.tone,
                layer.rotate,
              )}
              style={{ top: i * 18, zIndex: i + 1 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 * i, duration: 0.45, ease }}
            >
              <p className="text-[0.7rem] text-white/70">{layer.label}</p>
              <p className="mt-1 font-display text-[1.05rem] font-bold">
                {i === 0
                  ? `${projects} active`
                  : i === 1
                    ? formatCurrencyCompact(pipeline, currency as "NGN")
                    : "On track"}
              </p>
            </motion.div>
          ))}
        </div>
      </button>

      <Link
        href="/projects/new"
        className="mt-auto inline-flex items-center justify-center gap-1 rounded-full bg-[#3B05C4] px-4 py-2.5 text-[0.78rem] font-semibold text-white transition hover:bg-[#2C0494]"
      >
        Add new project
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </SoftCard>
  );
}

function ActivityTransfersCard({
  className,
  attention,
  activity,
  members,
}: {
  className?: string;
  attention: AttentionItem[];
  activity: ActivityItem[];
  members: DashboardMember[];
}) {
  const rows =
    activity.length > 0
      ? activity.slice(0, 4).map((item) => ({
          id: item.id,
          title: item.actorName,
          subtitle: item.summary,
          tone: "neutral" as const,
          meta: new Date(item.createdAt).toLocaleDateString("en-NG", {
            month: "short",
            day: "numeric",
          }),
        }))
      : attention.length > 0
        ? attention.slice(0, 4).map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.severity.toLowerCase(),
            tone: item.severity === "HIGH" ? ("bad" as const) : ("ok" as const),
            meta: item.severity,
          }))
        : members.slice(0, 4).map((m) => ({
            id: m.id,
            title: m.name,
            subtitle: roleLabel(m.role),
            tone: "ok" as const,
            meta: "Seat",
          }));

  return (
    <SoftCard
      className={cn("flex flex-col", className)}
      index={9}
      href="/notifications"
      ariaLabel="Open notifications — recent activity"
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[0.78rem] font-medium text-neutral-500">Workspace movement</p>
          <h3 className="mt-0.5 font-display text-[1.1rem] font-bold text-[#16024A]">
            Recent activity
          </h3>
        </div>
        <Users className="h-4 w-4 text-[#3B05C4]" aria-hidden />
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 text-[0.84rem] leading-relaxed text-neutral-500">
          Activity from teammates, approvals, and delivery will land here as your workspace grows.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((row, i) => (
            <motion.li
              key={row.id}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F4F0FF] font-display text-[0.75rem] font-bold text-[#3B05C4]">
                {row.title
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join("")
                  .toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.84rem] font-semibold text-[#16024A]">{row.title}</p>
                <p className="truncate text-[0.72rem] text-neutral-500">{row.subtitle}</p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[0.65rem] font-semibold",
                  row.tone === "bad" && "bg-[#FEECEC] text-[#B42318]",
                  row.tone === "ok" && "bg-[#E8F8EF] text-[#027A48]",
                  row.tone === "neutral" && "bg-[#F4F0FF] text-[#3B05C4]",
                )}
              >
                {row.meta}
              </span>
            </motion.li>
          ))}
        </ul>
      )}

      <span className="mt-auto pt-4 text-[0.75rem] font-semibold text-[#3B05C4]">
        View all activity
      </span>
    </SoftCard>
  );
}

function SecurityCard({ className }: { className?: string }) {
  return (
    <SoftCard
      className={cn("flex min-h-[17.5rem] flex-col", className)}
      index={10}
      href="/settings/security"
      ariaLabel="Open security settings"
    >
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#F4F0FF] text-[#3B05C4]">
        <Fingerprint className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-[1.15rem] font-bold leading-snug text-[#16024A]">
        Keep the workspace safe
      </h3>
      <p className="mt-2 text-[0.82rem] leading-relaxed text-neutral-500">
        Review security settings, sessions, and access controls for your agency account.
      </p>
      <span className="mt-auto inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#16024A] px-4 py-2.5 text-[0.78rem] font-semibold text-white">
        <Shield className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>Update security</span>
      </span>
    </SoftCard>
  );
}
