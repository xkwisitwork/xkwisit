import {
  ClosingPair,
  FeatureBlock,
  FrameColumns,
  FrameHero,
  FrameNav,
  FramePage,
  FrameStage,
  ProofBand,
  SplitFeature,
} from "@/components/marketing/frames/SiteFrames";
import { ROUTES } from "@/config/site";

export type CasePreview = {
  slug: string;
  title: string;
  result: string;
  summary: string;
  image: string;
};

const extraImage: Record<string, string> = {
  "northline-commerce": "/images/levers/brand-wall.jpg",
  "harbor-health": "/images/people/desk-review.jpg",
  "ledger-labs": "/images/levers/sales-calendar.jpg",
};

const howToRead = [
  {
    title: "Problem first",
    body: "Every study should name what was stuck before any “result” line.",
  },
  {
    title: "Permissioned names",
    body: "If a brand is named, we have permission. If not, we describe the shape of the gap.",
  },
  {
    title: "Not a guarantee",
    body: "Past work is a pattern, not a promise of the same multiple for you.",
  },
] as const;

const showHide = [
  {
    title: "We show",
    items: ["The stuck part", "What we changed", "Direction of the weekly numbers"],
  },
  {
    title: "We hide",
    items: ["Confidential revenue tables", "Unpermissioned logos", "Fabricated 10x charts"],
  },
] as const;

export function CaseStudyDetailFrames({
  item,
  others,
}: {
  item: {
    slug: string;
    title: string;
    result: string;
    summary: string;
    body: string;
    image: string;
  };
  others: readonly CasePreview[];
}) {
  const second = others[0];
  const third = others[1];

  return (
    <FrameStage label="Case study" caption={item.summary}>
      <FrameColumns>
        <FramePage>
          <FrameHero
            nav={
              <FrameNav
                links={[{ href: ROUTES.caseStudies, label: "Case studies" }]}
                ctaHref={ROUTES.book}
                ctaLabel="Book a strategy call"
              />
            }
            title={item.title}
            description={item.summary}
            primaryHref={ROUTES.book}
            primaryLabel="Book a strategy call"
            secondaryHref={ROUTES.caseStudies}
            secondaryLabel="All case studies"
            image={item.image}
            imageAlt={item.title}
            stats={[{ value: item.result, label: "The shape of the work" }]}
          />
          <FeatureBlock
            heading={item.result}
            visual={item.image}
            title={item.title}
            body={item.body}
            actionHref={ROUTES.book}
            actionLabel="Book a strategy call"
          />
          <ClosingPair
            eyebrow="Other shapes"
            title="Need a story closer to your market?"
            body="Book a call and tell us the leak. We will point you at a permissioned example or a sanitized twin."
            cards={[
              second
                ? {
                    title: second.title,
                    body: second.summary,
                    detail: second.result,
                    image: second.image,
                    href: `/case-studies/${second.slug}`,
                    actionLabel: second.title,
                  }
                : { title: item.result, body: item.summary, image: item.image, href: ROUTES.book, actionLabel: "Book a strategy call" },
              third
                ? {
                    title: third.title,
                    body: third.summary,
                    detail: third.result,
                    image: third.image,
                    href: `/case-studies/${third.slug}`,
                    actionLabel: third.title,
                  }
                : {
                    title: "All case studies",
                    body: item.title,
                    image: item.image,
                    href: ROUTES.caseStudies,
                    actionLabel: "All case studies",
                  },
            ]}
          />
        </FramePage>
      </FrameColumns>
    </FrameStage>
  );
}

export function CaseStudyGallery({ cases }: { cases: readonly CasePreview[] }) {
  const northline = cases.find((item) => item.slug === "northline-commerce") ?? cases[0];
  const harbor = cases.find((item) => item.slug === "harbor-health") ?? cases[1];
  const ledger = cases.find((item) => item.slug === "ledger-labs") ?? cases[2];

  if (!northline) return null;

  return (
    <FrameStage label="Case studies" caption="Work where we found what was stuck, fixed that part, and the weekly numbers moved.">
      <FrameColumns>
        <FramePage>
          <FrameHero
            nav={
              <FrameNav
                links={cases.map((item) => ({ href: `/case-studies/${item.slug}`, label: item.title }))}
                ctaHref={ROUTES.book}
                ctaLabel="Book a strategy call"
              />
            }
            title={
              <>
                Example shapes of the gap.
                <span className="mt-1 block">Real names when we have permission.</span>
              </>
            }
            description="Work where we found what was stuck, fixed that part, and the weekly numbers moved."
            primaryHref={ROUTES.book}
            primaryLabel="Book a strategy call"
            image={northline.image}
            imageAlt={northline.title}
            stats={[
              { value: "3.2×", label: "Northline, more deals" },
              { value: "41%", label: "Harbor, lower CAC" },
            ]}
            names={cases.map((item) => ({ label: item.title, href: `/case-studies/${item.slug}` }))}
          />
          <SplitFeature
            eyebrow="The shape of the work"
            title="Example shapes of the gap."
            visuals={[]}
            cards={cases.map((item) => ({
              title: item.title,
              body: item.summary,
              detail: item.result,
              image: item.image,
              href: `/case-studies/${item.slug}`,
              actionLabel: item.title,
            }))}
          />
          <FeatureBlock
            heading="What a useful case study must contain."
            visual="/images/levers/sales-pipeline.jpg"
            title=""
            lines={howToRead.map((item) => ({ title: item.title, body: item.body }))}
            actionHref={`/case-studies/${northline.slug}`}
            actionLabel="Read the shape of the work"
          />
          <ProofBand
            title={showHide[0].title}
            steps={showHide[0].items.map((item) => ({ title: item }))}
            href={harbor ? `/case-studies/${harbor.slug}` : ROUTES.caseStudies}
            label="Read the shape of the work"
            image={harbor?.image}
            secondTitle={showHide[1].title}
            panelNotes={showHide[1].items.map((item) => ({ title: item }))}
            secondHref={ROUTES.book}
            secondLabel="Book a strategy call"
            secondImage={harbor ? extraImage[harbor.slug] ?? harbor.image : undefined}
          />
          {ledger ? (
            <ClosingPair
              eyebrow={ledger.result}
              title={ledger.title}
              lines={["Past work is a pattern, not a promise of the same multiple for you.", ledger.summary]}
              cards={[
                {
                  title: ledger.title,
                  body: ledger.summary,
                  detail: ledger.result,
                  image: ledger.image,
                  href: `/case-studies/${ledger.slug}`,
                  actionLabel: ledger.title,
                },
                {
                  title: "Need a story closer to your market?",
                  body: "Book a call and tell us the leak. We will point you at a permissioned example or a sanitized twin.",
                  image: "/images/people/desk-review.jpg",
                  href: ROUTES.book,
                  actionLabel: "Book a strategy call",
                },
              ]}
            />
          ) : null}
        </FramePage>
      </FrameColumns>
    </FrameStage>
  );
}
