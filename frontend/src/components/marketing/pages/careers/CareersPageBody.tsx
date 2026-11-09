import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageCard, PageFaq, PageSection } from "@/components/marketing/pages/shared";
import { CtaSection } from "@/components/marketing/sections/CtaSection";
import { siteConfig } from "@/config/site";

const traits = [
  "Hate vanity dashboards",
  "Write and speak in plain language",
  "Own outcomes, not activity theatre",
  "Comfortable with African growth realities",
] as const;

const process = [
  { t: "Email", b: "Send work samples and the problem you love solving." },
  { t: "Work sample", b: "A short teardown or brief - not a 40-page CV essay." },
  { t: "Conversation", b: "We talk fit. No trick brainteasers." },
] as const;

const faqs = [
  {
    q: "Are roles remote?",
    a: "Often hybrid around Lagos. Say what you need in the first email.",
  },
  {
    q: "Do you take interns?",
    a: "Rarely, and only when there is a real owner to mentor. Ask - do not assume.",
  },
] as const;

export function CareersPageBody() {
  return (
    <>
      <PageSection eyebrow="Who thrives" title="Traits we hire for.">
        <ul className="grid gap-3 tablet:grid-cols-2">
          {traits.map((item, index) => (
            <li key={item}>
              <PageCard tone={index % 2 === 1 ? "soft" : "white"}>
                <p className="font-display text-[1.05rem] font-bold text-mint-ink">{item}</p>
              </PageCard>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection tone="soft" eyebrow="Process" title="How applications move.">
        <ol className="grid gap-4 tablet:grid-cols-3">
          {process.map((item, index) => (
            <li key={item.t}>
              <PageCard tone={index === 1 ? "ink" : "white"} className="h-full">
                <h3
                  className={`font-display text-[1.15rem] font-bold ${
                    index === 1 ? "text-white" : "text-mint-ink"
                  }`}
                >
                  {item.t}
                </h3>
                <p
                  className={`mt-2 text-[0.9rem] ${
                    index === 1 ? "text-white/70" : "text-neutral-600"
                  }`}
                >
                  {item.b}
                </p>
              </PageCard>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-mint px-2 pl-6 pr-2 text-[0.85rem] font-semibold text-white hover:bg-mint-deep"
          >
            <span>Email the team</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-mint">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </div>
      </PageSection>

      <PageFaq title="Careers questions" items={faqs} />
      <CtaSection />
    </>
  );
}
