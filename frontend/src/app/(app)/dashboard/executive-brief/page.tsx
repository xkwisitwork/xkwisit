"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  Building2,
  RefreshCw,
  Shield,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

import { Skeleton } from "@/components/ui/Skeleton";
import { useDashboard } from "@/features/dashboard";
import {
  getPlatformAudit,
  getPlatformStats,
  type PlatformAuditEvent,
  type PlatformStats,
} from "@/features/platform/api/platform.api";
import { ROLES } from "@/lib/constants/roles";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ExecutiveBriefPage() {
  const { data: session, status } = useSession();
  const isAdmin =
    Boolean(session?.user?.isPlatformAdmin) ||
    session?.user?.role === ROLES.SUPER_ADMIN;

  if (status === "loading") {
    return <p className="text-300 text-neutral-600">Loading…</p>;
  }

  if (status === "authenticated" && isAdmin) {
    return <PlatformExecutiveBrief accessToken={session?.accessToken} />;
  }

  return <AgencyExecutiveBrief enabled={status === "authenticated"} />;
}

function PlatformExecutiveBrief({
  accessToken,
}: {
  accessToken?: string | null;
}) {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [events, setEvents] = useState<PlatformAuditEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  async function load() {
    if (!accessToken) return;
    setFetching(true);
    try {
      const [s, a] = await Promise.all([
        getPlatformStats(accessToken),
        getPlatformAudit(8, accessToken),
      ]);
      setStats(s);
      setEvents(a);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load network brief");
    } finally {
      setLoading(false);
      setFetching(false);
    }
  }

  useEffect(() => {
    if (!accessToken) return;
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload when token changes
  }, [accessToken]);

  if (loading && !stats) {
    return (
      <div className="grid min-w-0 gap-4">
        <Skeleton variant="rectangle" className="h-20 w-full rounded-[1.5rem]" />
        <div className="grid gap-3 tablet:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rectangle" className="h-36 w-full rounded-[1.5rem]" />
          ))}
        </div>
        <Skeleton variant="rectangle" className="h-64 w-full rounded-[1.75rem]" />
      </div>
    );
  }

  const workspaces = stats?.workspaces ?? 0;
  const active = stats?.active ?? 0;
  const trials = stats?.trials ?? 0;
  const users = stats?.users ?? 0;
  const admins = stats?.platformAdmins ?? 0;
  const newWs = stats?.newWorkspaces7d ?? 0;
  const newUsers = stats?.newUsers7d ?? 0;
  const assessments = stats?.assessments ?? 0;
  const bookings = stats?.bookings ?? 0;
  const sheets = stats?.sheetDownloads ?? 0;
  const suspended = stats?.suspended ?? 0;

  return (
    <section className="min-w-0 space-y-5">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="flex flex-col gap-3 tablet:flex-row tablet:items-end tablet:justify-between"
      >
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
            Executive brief
          </p>
          <h1 className="mt-1 font-display text-[1.75rem] font-bold tracking-tight text-[#16024A]">
            Network scorecard
          </h1>
          <p className="mt-1 max-w-2xl text-[0.9rem] text-neutral-500">
            A concise read of tenant growth, platform capacity, and attention signals across
            the whole Xkwisit network.
          </p>
        </div>
        <Link
          href="/platform"
          className="inline-flex items-center gap-1 self-start rounded-full bg-[#F4F0FF] px-3.5 py-2 text-[0.78rem] font-semibold text-[#3B05C4]"
        >
          Open platform control
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </motion.header>

      {error && !stats ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-[#F9DADA] bg-[#FFF8F8] px-4 py-3">
          <p className="text-[0.84rem] text-[#9B1C1C]">{error}</p>
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.75rem] font-semibold text-[#16024A] ring-1 ring-[#F2CACA]"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", fetching && "animate-spin")} />
            Refresh
          </button>
        </div>
      ) : null}

      <div className="grid gap-3 tablet:grid-cols-3">
        <BriefStat
          icon={<Building2 className="h-4 w-4" />}
          label="Workspaces"
          value={String(workspaces)}
          hint={`${trials} on trial · ${active} paid`}
        />
        <BriefStat
          icon={<Users className="h-4 w-4" />}
          label="Network users"
          value={String(users)}
          hint={`${admins} platform admin${admins === 1 ? "" : "s"}`}
        />
        <BriefStat
          icon={<TrendingUp className="h-4 w-4" />}
          label="7-day growth"
          value={`+${newWs} / +${newUsers}`}
          hint="New workspaces / users"
        />
      </div>

      <div className="grid gap-3 laptop:grid-cols-12">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease }}
          className="rounded-[1.75rem] border border-[#EDE8F7] bg-white p-5 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.35)] laptop:col-span-7"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-[1.15rem] font-bold text-[#16024A]">
              Capacity snapshot
            </h2>
            <span className="rounded-full bg-[#F4F0FF] px-2.5 py-1 text-[0.68rem] font-semibold text-[#3B05C4]">
              {suspended} suspended
            </span>
          </div>

          <div className="mt-5 grid gap-3 tablet:grid-cols-3">
            <Snapshot
              label="Assessments"
              value={String(assessments)}
              icon={<Briefcase className="h-4 w-4" />}
            />
            <Snapshot
              label="Bookings"
              value={String(bookings)}
              icon={<Activity className="h-4 w-4" />}
            />
            <Snapshot
              label="Sheet leads"
              value={String(sheets)}
              icon={<Shield className="h-4 w-4" />}
            />
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-[0.72rem] text-neutral-500">
              <span>Paid workspace share</span>
              <span>
                {workspaces ? Math.round((active / workspaces) * 100) : 0}%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#F4F0FF]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#3B05C4] to-[#5B45FF]"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.max(
                    4,
                    Math.min(100, workspaces ? (active / workspaces) * 100 : 0),
                  )}%`,
                }}
                transition={{ duration: 0.7, ease }}
              />
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.45, ease }}
          className="flex flex-col rounded-[1.75rem] bg-[#16024A] p-5 text-white shadow-[0_22px_48px_-28px_rgba(22,2,74,0.55)] laptop:col-span-5"
        >
          <h2 className="font-display text-[1.15rem] font-bold">Attention brief</h2>
          <p className="mt-1 text-[0.8rem] text-white/65">
            {suspended > 0
              ? `${suspended} workspace${suspended === 1 ? "" : "s"} suspended — review status.`
              : events.length === 0
                ? "No blocking network signals right now."
                : `${events.length} recent platform event${events.length === 1 ? "" : "s"}.`}
          </p>

          {events.length === 0 ? (
            <p className="mt-6 flex-1 text-[0.86rem] leading-relaxed text-white/80">
              Audit events, suspended tenants, and growth spikes will surface here as the
              network moves.
            </p>
          ) : (
            <ul className="mt-5 flex-1 space-y-3">
              {events.slice(0, 5).map((item) => (
                <li key={item.id} className="rounded-2xl bg-white/10 px-3.5 py-3">
                  <p className="text-[0.84rem] font-semibold">{item.title}</p>
                  <p className="mt-0.5 text-[0.68rem] uppercase tracking-wide text-white/55">
                    {item.type}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <BriefLink href="/platform/workspaces" label="Workspaces" />
            <BriefLink href="/platform/users" label="Users" />
            <BriefLink href="/platform/health" label="Health" />
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function AgencyExecutiveBrief({ enabled }: { enabled: boolean }) {
  const { data, isLoading, isError, refetch, isFetching } = useDashboard(enabled);

  if (isLoading) {
    return (
      <div className="grid min-w-0 gap-4">
        <Skeleton variant="rectangle" className="h-20 w-full rounded-[1.5rem]" />
        <div className="grid gap-3 tablet:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rectangle" className="h-36 w-full rounded-[1.5rem]" />
          ))}
        </div>
        <Skeleton variant="rectangle" className="h-64 w-full rounded-[1.75rem]" />
      </div>
    );
  }

  const currency = data?.currency ?? "NGN";
  const orgName = data?.organization?.name ?? "Workspace";
  const projects = data?.activeProjects ?? 0;
  const pipeline = data?.pipelineValue ?? 0;
  const revenue = data?.revenueMtd ?? 0;
  const members = data?.memberCount ?? data?.members?.length ?? 0;
  const seats = data?.seatsIncluded ?? 0;
  const utilization = data?.teamUtilization ?? 0;
  const attention = data?.attention ?? [];
  const activity = data?.recentActivity ?? [];
  const high = data?.highAttention ?? attention.filter((a) => a.severity === "HIGH").length;
  const stats = data?.stats ?? [];

  return (
    <section className="min-w-0 space-y-5">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="flex flex-col gap-3 tablet:flex-row tablet:items-end tablet:justify-between"
      >
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
            Executive brief
          </p>
          <h1 className="mt-1 font-display text-[1.75rem] font-bold tracking-tight text-[#16024A]">
            {orgName} scorecard
          </h1>
          <p className="mt-1 max-w-2xl text-[0.9rem] text-neutral-500">
            A concise read of delivery capacity, commercial signal, and attention items —
            drawn only from live workspace data.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 self-start rounded-full bg-[#F4F0FF] px-3.5 py-2 text-[0.78rem] font-semibold text-[#3B05C4]"
        >
          Open dashboard
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </motion.header>

      {isError && !data ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-[#F9DADA] bg-[#FFF8F8] px-4 py-3">
          <p className="text-[0.84rem] text-[#9B1C1C]">
            Brief metrics could not be loaded.
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.75rem] font-semibold text-[#16024A] ring-1 ring-[#F2CACA]"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin")} />
            Refresh
          </button>
        </div>
      ) : null}

      <div className="grid gap-3 tablet:grid-cols-3">
        <BriefStat
          icon={<Wallet className="h-4 w-4" />}
          label="Collected MTD"
          value={formatCurrencyCompact(revenue, currency)}
          hint="Fees already received"
        />
        <BriefStat
          icon={<TrendingUp className="h-4 w-4" />}
          label="Pipeline"
          value={formatCurrencyCompact(pipeline, currency)}
          hint="Open commercial value"
        />
        <BriefStat
          icon={<Briefcase className="h-4 w-4" />}
          label="Active projects"
          value={String(projects)}
          hint={`${high} high-attention item${high === 1 ? "" : "s"}`}
        />
      </div>

      <div className="grid gap-3 laptop:grid-cols-12">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease }}
          className="rounded-[1.75rem] border border-[#EDE8F7] bg-white p-5 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.35)] laptop:col-span-7"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-[1.15rem] font-bold text-[#16024A]">
              Capacity snapshot
            </h2>
            <span className="rounded-full bg-[#F4F0FF] px-2.5 py-1 text-[0.68rem] font-semibold text-[#3B05C4]">
              {Math.round(utilization)}% utilized
            </span>
          </div>

          <div className="mt-5 grid gap-3 tablet:grid-cols-3">
            <Snapshot label="Members" value={String(members)} icon={<Users className="h-4 w-4" />} />
            <Snapshot label="Seats" value={String(seats)} />
            <Snapshot
              label="Open seats"
              value={String(Math.max(0, seats - members))}
            />
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-[0.72rem] text-neutral-500">
              <span>Seat utilization</span>
              <span>{Math.round(utilization)}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#F4F0FF]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#3B05C4] to-[#5B45FF]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(4, Math.min(100, utilization))}%` }}
                transition={{ duration: 0.7, ease }}
              />
            </div>
          </div>

          {stats.length > 0 ? (
            <ul className="mt-6 grid gap-2 tablet:grid-cols-2">
              {stats.map((stat) => (
                <li
                  key={stat.id}
                  className="flex items-center justify-between rounded-2xl bg-[#F7F5FC] px-3.5 py-3"
                >
                  <span className="text-[0.78rem] text-neutral-600">{stat.label}</span>
                  <span className="font-display text-[0.95rem] font-bold text-[#16024A]">
                    {stat.value}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.45, ease }}
          className="flex flex-col rounded-[1.75rem] bg-[#16024A] p-5 text-white shadow-[0_22px_48px_-28px_rgba(22,2,74,0.55)] laptop:col-span-5"
        >
          <h2 className="font-display text-[1.15rem] font-bold">Attention brief</h2>
          <p className="mt-1 text-[0.8rem] text-white/65">
            {attention.length === 0
              ? "No blocking items in the workspace right now."
              : `${attention.length} signal${attention.length === 1 ? "" : "s"} need a look.`}
          </p>

          {attention.length === 0 ? (
            <p className="mt-6 flex-1 text-[0.86rem] leading-relaxed text-white/80">
              When approvals stall, leads go quiet, or projects slip, they will appear here with
              severity so leadership can act fast.
            </p>
          ) : (
            <ul className="mt-5 flex-1 space-y-3">
              {attention.slice(0, 5).map((item) => (
                <li key={item.id} className="rounded-2xl bg-white/10 px-3.5 py-3">
                  <p className="text-[0.84rem] font-semibold">{item.title}</p>
                  <p className="mt-0.5 text-[0.68rem] uppercase tracking-wide text-white/55">
                    {item.severity}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <BriefLink href="/approvals" label="Approvals" />
            <BriefLink href="/projects" label="Projects" />
            <BriefLink href="/crm/leads" label="Leads" />
          </div>
        </motion.article>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.45, ease }}
        className="rounded-[1.75rem] border border-[#EDE8F7] bg-white p-5 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.35)]"
      >
        <h2 className="font-display text-[1.15rem] font-bold text-[#16024A]">
          Latest workspace movement
        </h2>
        {activity.length === 0 ? (
          <p className="mt-3 text-[0.86rem] text-neutral-500">
            No recent activity yet. Team actions will stream into this brief as they happen.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-[#F0ECF6]">
            {activity.slice(0, 6).map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-[0.86rem] text-[#16024A]">
                    <span className="font-semibold">{item.actorName}</span> {item.summary}
                  </p>
                </div>
                <time className="shrink-0 text-[0.7rem] text-neutral-500">
                  {new Date(item.createdAt).toLocaleDateString("en-NG", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </li>
            ))}
          </ul>
        )}
      </motion.article>
    </section>
  );
}

function BriefStat({
  icon,
  label,
  value,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      className="rounded-[1.5rem] border border-[#EDE8F7] bg-white p-5 shadow-[0_14px_36px_-30px_rgba(22,2,74,0.4)]"
    >
      <div className="flex items-center gap-2 text-[#3B05C4]">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F4F0FF]">{icon}</span>
        <span className="text-[0.78rem] font-medium text-neutral-500">{label}</span>
      </div>
      <p className="mt-3 font-display text-[1.55rem] font-bold tabular-nums text-[#16024A]">
        {value}
      </p>
      <p className="mt-1 text-[0.72rem] text-neutral-500">{hint}</p>
    </motion.article>
  );
}

function Snapshot({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-[#F7F5FC] px-4 py-3">
      <div className="flex items-center gap-1.5 text-neutral-500">
        {icon}
        <p className="text-[0.72rem]">{label}</p>
      </div>
      <p className="mt-1 font-display text-[1.35rem] font-bold text-[#16024A]">{value}</p>
    </div>
  );
}

function BriefLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1.5 text-[0.72rem] font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
    >
      {label}
      <ArrowUpRight className="h-3 w-3" aria-hidden />
    </Link>
  );
}
