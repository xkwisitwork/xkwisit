"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, Radio, Zap } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

type FeedKind = "alert" | "win" | "wait" | "pulse";

type FeedItem = {
  id: string;
  kind: FeedKind;
  title: string;
  detail: string;
  time: string;
};

const FEED: FeedItem[] = [
  {
    id: "1",
    kind: "alert",
    title: "A lead is going quiet",
    detail: "An enquiry has had no reply for two days",
    time: "Just now",
  },
  {
    id: "2",
    kind: "wait",
    title: "A design is waiting",
    detail: "The client has not approved it, so it cannot go out",
    time: "4m ago",
  },
  {
    id: "3",
    kind: "pulse",
    title: "This week's weak spot",
    detail: "Demand is the low score. Fund that before more ads.",
    time: "12m ago",
  },
  {
    id: "4",
    kind: "win",
    title: "Follow-up is happening",
    detail: "The stale enquiries have a name, and a call, on them",
    time: "28m ago",
  },
  {
    id: "5",
    kind: "alert",
    title: "Spend, and no sale",
    detail: "The ads are on. The pipeline has not moved.",
    time: "1h ago",
  },
  {
    id: "6",
    kind: "pulse",
    title: "Monday numbers are ready",
    detail: "Brand, demand, sales, and retention. Same four, every week.",
    time: "2h ago",
  },
  {
    id: "7",
    kind: "wait",
    title: "An invoice is sitting",
    detail: "Sent. Not opened. The work is waiting on a payment.",
    time: "3h ago",
  },
  {
    id: "8",
    kind: "win",
    title: "The offer was rewritten",
    detail: "The page people see after the click now says one thing",
    time: "Yesterday",
  },
];

const kindMeta: Record<FeedKind, { Icon: typeof Zap; chip: string; ring: string }> = {
  alert: {
    Icon: AlertTriangle,
    chip: "bg-energy text-white",
    ring: "border-energy/25",
  },
  win: {
    Icon: CheckCircle2,
    chip: "bg-mint text-white",
    ring: "border-mint/30",
  },
  wait: {
    Icon: Clock,
    chip: "bg-focal text-[#16024A]",
    ring: "border-focal/25",
  },
  pulse: {
    Icon: Zap,
    chip: "bg-mint text-white",
    ring: "border-mint/30",
  },
};

/**
 * Mission Feed - a living strip of operator signals.
 * Feels like the product is already running without you.
 */
export function MissionFeed() {
  const visible = FEED.slice(0, 5);

  return (
    <section className="relative overflow-x-clip bg-white">
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-20">
        <div className="grid items-start gap-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="flex items-center justify-center gap-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-focal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-focal" />
              </span>
              The command center
            </p>
            <h2 className="mt-4 text-center font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.12] tracking-tight text-neutral-900">
              The problem shows up
              <span className="block text-neutral-600">before it blows up.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-center text-[0.95rem] leading-relaxed text-neutral-600">
              This is the agency side. A quiet lead, a design stuck in approval, an
              invoice nobody opened. You see it while it is still small.
            </p>

            <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
              {[
                "A name on every alert",
                "One problem this week, not twelve dashboards",
                "Approvals, leads, and spend in the same place",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-300 text-neutral-700"
                >
                  <Radio className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="relative mx-auto w-full max-w-3xl"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-mint/10 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-neutral-900/90 bg-neutral-950 shadow-[0_32px_64px_-28px_rgba(22,2,74,0.55)]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-energy/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-focal/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-mint-mid/80" />
                  </span>
                  <span className="ml-2 font-display text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/80">
                    xkwisit · feed
                  </span>
                </div>
                <span className="rounded-full bg-mint px-2.5 py-0.5 text-[0.65rem] font-semibold text-white">
                  LIVE
                </span>
              </div>

              <ul className="relative space-y-0 p-2">
                {visible.map((item) => {
                  const meta = kindMeta[item.kind];
                  const Icon = meta.Icon;
                  return (
                    <li
                      key={item.id}
                      className={cn(
                        "mb-2 flex gap-3 rounded-2xl border bg-white/[0.03] p-3.5 last:mb-0",
                        meta.ring,
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                          meta.chip,
                        )}
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-display text-300 font-bold text-white">
                            {item.title}
                          </p>
                          <span className="shrink-0 text-[0.65rem] text-white/80">
                            {item.time}
                          </span>
                        </div>
                        <p className="mt-0.5 text-200 leading-snug text-white/85">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
