import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageCard, PageFaq, PageSection } from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { ROUTES } from "@/config/site";

const assets = [
  {
    href: "/resources/playbooks",
    title: "Playbooks",
    forWho: "Operators who need steps to rerun next week",
    use: "Print or share in the Monday meeting.",
  },
  {
    href: "/resources/templates",
    title: "Templates",
    forWho: "Teams that need briefs and teardown sheets",
    use: "Fill once, reuse every campaign.",
  },
  {
    href: "/resources/guides",
    title: "Guides",
    forWho: "Owners who want the longer why",
    use: "Read before you buy another tool.",
  },
] as const;

const order = [
  "Run the free assessment or X-Ray",
  "Skim the playbook that matches your stuck part",
  "Use a template on this week’s campaign",
  "Book a call only if you want us in the room",
] as const;

const faqs = [
  {
    q: "Are resources a substitute for an engagement?",
    a: "They help you start. Live work still needs diagnosis and an owner when the problem spans brand, ads, and sales.",
  },
  {
    q: "Do I need an account?",
    a: "Guides and playbooks linked here are open. Portal access comes with paid work.",
  },
] as const;

export function ResourcesPageBody() {
  return (
    <>
      <PageSection
        eyebrow="Library"
        title="Who each asset is for - and how to use it."
      >
        <ul className="grid gap-4 tablet:grid-cols-3">
          {assets.map((item, index) => (
            <li key={item.href}>
              <Link href={item.href} className="block h-full">
                <PageCard
                  tone={index === 1 ? "ink" : "white"}
                  className="group flex h-full flex-col"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className={`font-display text-[1.25rem] font-bold ${
                        index === 1 ? "text-white" : "text-mint-ink"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105 ${
                        index === 1 ? "bg-mint text-white" : "bg-mint-soft text-mint"
                      }`}
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                  <p
                    className={`mt-4 text-[0.85rem] font-semibold ${
                      index === 1 ? "text-mint" : "text-mint"
                    }`}
                  >
                    For: {item.forWho}
                  </p>
                  <p
                    className={`mt-2 text-[0.9rem] ${
                      index === 1 ? "text-white/70" : "text-neutral-600"
                    }`}
                  >
                    {item.use}
                  </p>
                </PageCard>
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection tone="soft" eyebrow="Order" title="A sensible path through the library.">
        <ol className="mx-auto grid max-w-2xl gap-3">
          {order.map((item, i) => (
            <li key={item}>
              <PageCard className="flex gap-3">
                <span className="font-display font-bold text-mint">0{i + 1}</span>
                <p className="text-[0.95rem] text-neutral-700">{item}</p>
              </PageCard>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link
            href={ROUTES.growthAssessment}
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-mint px-2 pl-6 pr-2 text-[0.85rem] font-semibold text-white hover:bg-mint-deep"
          >
            <span>Start free check</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-mint">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </div>
      </PageSection>

      <PageFaq title="Resources questions" items={faqs} />
      <SolteraCloser />
    </>
  );
}
