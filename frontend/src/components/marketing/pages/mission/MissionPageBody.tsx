import { PageCard, PageFaq, PageSection } from "@/components/marketing/pages/shared";
import { CtaSection } from "@/components/marketing/sections/CtaSection";
import { siteConfig } from "@/config/site";

const beliefs = [
  "Spend without a diagnosis is hope with a receipt.",
  "Brand, ads, and follow-up are one business - not three vendors.",
  "Owners deserve systems they can run when the agency leaves the chat.",
] as const;

const refuse = [
  "Vanity metrics that never touch a sale",
  "Open-ended retainers with no named problem",
  "Decks that die in shared drives",
] as const;

const forNotFor = [
  {
    title: "We are for",
    items: [
      "Operators who want the stuck part named",
      "Teams tired of channel silos",
      "Brands selling in WhatsApp-heavy markets",
    ],
  },
  {
    title: "We are not for",
    items: [
      "People who only want “more posts”",
      "Budgets that cannot clear our published minimum",
      "Projects with no owner on the client side",
    ],
  },
] as const;

const faqs = [
  {
    q: "Is the mission just marketing copy?",
    a: `No. ${siteConfig.name} structures engagements around diagnosis first, one Monday number, and a portal you can see.`,
  },
  {
    q: "How does mission show up weekly?",
    a: "One problem, one owner, one check. If a task does not serve that problem, it waits.",
  },
] as const;

export function MissionPageBody() {
  return (
    <>
      <PageSection
        eyebrow="Beliefs"
        title="What we hold when spend pressure rises."
      >
        <ul className="grid gap-4">
          {beliefs.map((item, index) => (
            <li key={item}>
              <PageCard tone={index === 1 ? "ink" : "soft"}>
                <p
                  className={`font-display text-[1.25rem] font-bold leading-snug ${
                    index === 1 ? "text-white" : "text-mint-ink"
                  }`}
                >
                  {item}
                </p>
              </PageCard>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection tone="soft" eyebrow="We refuse" title="Work we will not take.">
        <ul className="grid gap-4 tablet:grid-cols-3">
          {refuse.map((item) => (
            <li key={item}>
              <PageCard className="h-full">
                <p className="text-[0.95rem] font-medium text-mint-ink">{item}</p>
              </PageCard>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection eyebrow="Fit" title="Who this mission serves - and who it does not.">
        <div className="grid gap-4 tablet:grid-cols-2">
          {forNotFor.map((col, index) => (
            <PageCard key={col.title} tone={index === 1 ? "soft" : "white"}>
              <h3 className="font-display text-[1.2rem] font-bold text-mint-ink">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.items.map((item) => (
                  <li key={item} className="text-[0.9rem] text-neutral-600">
                    · {item}
                  </li>
                ))}
              </ul>
            </PageCard>
          ))}
        </div>
      </PageSection>

      <PageSection
        tone="soft"
        eyebrow="In the week"
        title="Mission is a Monday habit, not a poster."
        description="If the week’s work cannot point at one shared problem, we stop and rename the problem before we ship more activity."
      />

      <PageFaq title="Mission questions" items={faqs} />
      <CtaSection />
    </>
  );
}
