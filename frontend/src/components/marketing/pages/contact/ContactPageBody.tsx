import Link from "next/link";
import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";

import {
  PageCard,
  PageFaq,
  PagePill,
  PageSection,
} from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { ROUTES, siteConfig } from "@/config/site";

const channels = [
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    hint: "We reply to operators first",
    Icon: Mail,
  },
  {
    label: "Phone",
    value: "+234 902 317 7560",
    href: "tel:+2349023177560",
    hint: "Lagos line",
    Icon: Phone,
  },
  {
    label: "Office",
    value: `${siteConfig.contact.address.city}, ${siteConfig.contact.address.country}`,
    href: ROUTES.book,
    hint: "Book a call instead of dropping by",
    Icon: MapPin,
  },
] as const;

const prepare = [
  "One growth question you care about this month",
  "Rough monthly ad or marketing spend (order of magnitude is fine)",
  "Where leads currently die - site, WhatsApp, or sales stages",
  "Who owns brand vs ads vs follow-up today",
] as const;

const afterContact = [
  {
    title: "We read the note",
    body: "A strategist skims for the stuck part - not to pitch a random campaign.",
  },
  {
    title: "We reply within a business day",
    body: "Expect a short reply or a calendar nudge - not a 12-page proposal.",
  },
  {
    title: "Call or free check",
    body: "If email is too slow for you, book 30 minutes or start the assessment.",
  },
] as const;

const faqs = [
  {
    q: "How fast do you reply?",
    a: "Within one business day for operators. Partnerships and press may take longer.",
  },
  {
    q: "Can I visit the office unannounced?",
    a: "Better to book. We work in focus blocks. A call saves you a trip.",
  },
  {
    q: "WhatsApp?",
    a: "Use the published phone / WhatsApp line for quick logistics. Strategy still belongs on a booked call or the portal.",
  },
  {
    q: "Press or partnerships?",
    a: `Email ${siteConfig.contact.email} with “Press” or “Partnership” in the subject so it routes correctly.`,
  },
] as const;

export function ContactPageBody() {
  return (
    <>
      <PageSection
        eyebrow="Channels"
        title="Reach the team without a long email tennis match."
      >
        <ul className="grid gap-4 tablet:grid-cols-3">
          {channels.map((item, index) => (
            <li key={item.label}>
              <Link href={item.href} className="block h-full">
                <PageCard
                  tone={index === 1 ? "ink" : "white"}
                  className="group flex h-full flex-col"
                >
                  <div className="flex items-start justify-between">
                    <item.Icon
                      className={`h-5 w-5 ${index === 1 ? "text-mint" : "text-mint"}`}
                      aria-hidden
                    />
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:scale-105 ${
                        index === 1 ? "bg-mint text-white" : "bg-mint-soft text-mint"
                      }`}
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                  <PagePill
                    tone={index === 1 ? "mint" : "soft"}
                    className="mt-4 self-start"
                  >
                    {item.label}
                  </PagePill>
                  <p
                    className={`mt-3 font-display text-[1.15rem] font-bold ${
                      index === 1 ? "text-white" : "text-mint-ink"
                    }`}
                  >
                    {item.value}
                  </p>
                  <p
                    className={`mt-2 text-[0.85rem] ${
                      index === 1 ? "text-white/65" : "text-neutral-600"
                    }`}
                  >
                    {item.hint}
                  </p>
                </PageCard>
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        tone="soft"
        eyebrow="Before you write"
        title="Bring these four things - even roughly."
      >
        <ul className="grid max-w-3xl gap-3">
          {prepare.map((item, index) => (
            <li key={item}>
              <PageCard className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-[0.85rem] font-bold text-white">
                  {index + 1}
                </span>
                <p className="pt-2 text-[0.95rem] leading-relaxed text-neutral-700">{item}</p>
              </PageCard>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection eyebrow="After you reach out" title="What happens on our side.">
        <ol className="grid gap-4 tablet:grid-cols-3">
          {afterContact.map((item, index) => (
            <li key={item.title}>
              <PageCard tone={index === 1 ? "ink" : "white"} className="h-full">
                <Clock3
                  className={`h-5 w-5 ${index === 1 ? "text-mint" : "text-mint"}`}
                  aria-hidden
                />
                <h3
                  className={`mt-4 font-display text-[1.15rem] font-bold ${
                    index === 1 ? "text-white" : "text-mint-ink"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-2 text-[0.9rem] leading-relaxed ${
                    index === 1 ? "text-white/70" : "text-neutral-600"
                  }`}
                >
                  {item.body}
                </p>
              </PageCard>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        tone="soft"
        eyebrow="Faster doors"
        title="Skip the inbox if you already know you want a check or a call."
      >
        <div className="grid gap-4 tablet:grid-cols-2">
          <PageCard>
            <h3 className="font-display text-[1.35rem] font-bold text-mint-ink">
              Book 30 minutes
            </h3>
            <p className="mt-2 text-[0.9rem] text-neutral-600">
              Leave knowing the one problem to fix first.
            </p>
            <Link
              href={ROUTES.book}
              className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-mint px-2 pl-5 pr-2 text-[0.85rem] font-semibold text-white hover:bg-mint-deep"
            >
              <span>Open calendar</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-mint">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </PageCard>
          <PageCard tone="ink">
            <h3 className="font-display text-[1.35rem] font-bold text-white">
              Free Growth Assessment
            </h3>
            <p className="mt-2 text-[0.9rem] text-white/70">
              Answer plain questions. Get a score and a first move.
            </p>
            <Link
              href={ROUTES.growthAssessment}
              className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-mint px-2 pl-5 pr-2 text-[0.85rem] font-semibold text-white hover:bg-mint-deep"
            >
              <span>Start assessment</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-mint">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </PageCard>
        </div>
      </PageSection>

      <PageFaq
        title="Contact questions"
        description="Reply times, visits, and how to route press."
        items={faqs}
      />
      <SolteraCloser />
    </>
  );
}
