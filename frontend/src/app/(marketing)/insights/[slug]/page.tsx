import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPageCanvas, MarketingPageHero, MarketingSoftCard } from "@/components/marketing/MarketingPageHero";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";

const posts = {
  "diagnosis-before-spend": {
    slug: "diagnosis-before-spend",
    title: "Diagnosis before spend",
    category: "strategy",
    excerpt: "Why pouring budget into ads before the offer is clear burns quarters." },
  "one-scoreboard-rule": {
    slug: "one-scoreboard-rule",
    title: "Look at one set of numbers",
    category: "ops",
    excerpt:
      "The look, the ads, the follow-up, and sales should argue about the same problem." },
  "african-growth-ops": {
    slug: "african-growth-ops",
    title: "Growth ops for African brands",
    category: "market",
    excerpt: "What changes when your market buys on WhatsApp and closes offline." } } as const;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = posts[params.slug as keyof typeof posts];
  return { title: p?.title ?? "Insight", description: p?.excerpt };
}

export default function InsightPage({ params }: Props) {
  const p = posts[params.slug as keyof typeof posts];
  if (!p) notFound();
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        imageSrc="/images/levers/demand-content.jpg"
        imageAlt=""
        eyebrow={"Insights · " + p.category}
        title={p.title}
        description={p.excerpt}
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref={ROUTES.insights}
        secondaryLabel="All insights"
      />
      <Container className="px-4 pb-12 mobile-sm:px-5 tablet:px-8">
        <MarketingSoftCard className="max-w-3xl" tone="white">
          <article className="space-y-4 text-[0.95rem] leading-relaxed text-neutral-600">
            <p>
              Most teams are not short of effort. They are short of one shared problem. This
              note is how we approach {p.title.toLowerCase()} on live work.
            </p>
            <p>
              Start with the X-ray. Name the one problem. Point the ads, the page, and the
              follow-up at it for one week. Then look at those numbers, not the chart that
              only flatters you.
            </p>
          </article>
        </MarketingSoftCard>
      </Container>

      <SolteraCloser />
    </MarketingPageCanvas>
  );
}
