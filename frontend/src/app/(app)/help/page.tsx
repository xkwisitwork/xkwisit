"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  CreditCard,
  LifeBuoy,
  Mail,
  MessageSquare,
  Settings,
  Shield,
  Users,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

const guides = [
  {
    title: "Getting started",
    description: "Invite your team, set org details, and open your first client workspace.",
    href: "/settings/organization",
    icon: BookOpen,
  },
  {
    title: "Team & seats",
    description: "Add members, assign roles, and manage capacity for delivery.",
    href: "/team",
    icon: Users,
  },
  {
    title: "Billing & plans",
    description: "Review subscription status, invoices, and seat allotments.",
    href: "/settings/billing",
    icon: CreditCard,
  },
  {
    title: "Security controls",
    description: "Sessions, access policies, and workspace protection settings.",
    href: "/settings/security",
    icon: Shield,
  },
  {
    title: "Workspace settings",
    description: "Branding, notifications, integrations, and API keys.",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Messaging",
    description: "Inbox, channels, and client conversation threads.",
    href: "/messaging",
    icon: MessageSquare,
  },
] as const;

const faqs = [
  {
    q: "Where do I invite teammates?",
    a: "Open Team from the sidebar, or go to Settings → Organization to manage seats and membership.",
  },
  {
    q: "Why are some metrics at zero?",
    a: "Dashboard numbers come from live workspace records only. Modules without saved data stay at zero until you start using them.",
  },
  {
    q: "How do I change my password or sessions?",
    a: "Use Settings → Security to update credentials and review active sessions for your account.",
  },
  {
    q: "Who do I contact for account help?",
    a: `Email ${siteConfig.contact.email} — the Xkwisit team in Lagos responds on business days.`,
  },
] as const;

export default function HelpPage() {
  return (
    <section className="min-w-0 space-y-5">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="flex flex-col gap-4 rounded-[1.75rem] border border-[#EDE8F7] bg-white p-6 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.35)] tablet:flex-row tablet:items-end tablet:justify-between"
      >
        <div className="min-w-0">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F4F0FF] text-[#3B05C4]">
            <LifeBuoy className="h-6 w-6" aria-hidden />
          </div>
          <h1 className="mt-4 font-display text-[1.75rem] font-bold tracking-tight text-[#16024A]">
            Help & support
          </h1>
          <p className="mt-1 max-w-xl text-[0.9rem] text-neutral-500">
            Guides, answers, and a direct line to the Xkwisit team when you need a human.
          </p>
        </div>

        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#3B05C4] px-5 py-2.5 text-[0.82rem] font-semibold text-white shadow-[0_14px_32px_-16px_rgba(59,5,196,0.65)] transition hover:bg-[#2C0494]"
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden />
          Email support
        </a>
      </motion.header>

      <div className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3">
        {guides.map((guide, index) => {
          const Icon = guide.icon;
          return (
            <motion.div
              key={guide.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * index, duration: 0.4, ease }}
            >
              <Link
                href={guide.href}
                className={cn(
                  "group flex h-full flex-col rounded-[1.5rem] border border-[#EDE8F7] bg-white p-5",
                  "shadow-[0_14px_36px_-30px_rgba(22,2,74,0.35)] transition duration-200",
                  "hover:-translate-y-0.5 hover:border-[#3B05C4]/25 hover:shadow-[0_18px_40px_-28px_rgba(59,5,196,0.35)]",
                )}
              >
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F7F5FC] text-[#3B05C4] transition group-hover:bg-[#F4F0FF]">
                  <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-[1.05rem] font-bold text-[#16024A]">
                  {guide.title}
                </h2>
                <p className="mt-1.5 flex-1 text-[0.82rem] leading-relaxed text-neutral-500">
                  {guide.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[0.75rem] font-semibold text-[#3B05C4]">
                  Open
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-3 laptop:grid-cols-12">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45, ease }}
          className="rounded-[1.75rem] border border-[#EDE8F7] bg-white p-5 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.35)] laptop:col-span-7"
        >
          <h2 className="font-display text-[1.15rem] font-bold text-[#16024A]">
            Common questions
          </h2>
          <ul className="mt-4 divide-y divide-[#F0ECF6]">
            {faqs.map((item) => (
              <li key={item.q} className="py-4 first:pt-0 last:pb-0">
                <p className="text-[0.9rem] font-semibold text-[#16024A]">{item.q}</p>
                <p className="mt-1.5 text-[0.84rem] leading-relaxed text-neutral-500">
                  {item.a}
                </p>
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.45, ease }}
          className="flex flex-col rounded-[1.75rem] bg-[#16024A] p-6 text-white shadow-[0_22px_48px_-28px_rgba(22,2,74,0.55)] laptop:col-span-5"
        >
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/55">
            Direct support
          </p>
          <h2 className="mt-2 font-display text-[1.35rem] font-bold leading-snug">
            Talk to the Xkwisit team
          </h2>
          <p className="mt-3 text-[0.86rem] leading-relaxed text-white/70">
            Based in Lagos, Nigeria. Reach us for onboarding help, billing questions, or
            workspace setup — we reply on business days.
          </p>

          <div className="mt-6 space-y-3">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3 text-[0.84rem] font-semibold ring-1 ring-white/15 transition hover:bg-white/15"
            >
              <span className="inline-flex min-w-0 items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <span className="truncate">{siteConfig.contact.email}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
            </a>
            <Link
              href="/settings/security"
              className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-[0.8rem] font-semibold text-[#16024A] transition hover:bg-[#F4F0FF]"
            >
              <Shield className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Review security settings
            </Link>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
