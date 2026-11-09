import type { ReactNode } from "react";

import {
  ClosingPair,
  FeatureBlock,
  FrameColumns,
  FrameHero,
  FramePage,
  FrameStage,
  ProofBand,
  SplitFeature,
} from "@/components/marketing/frames/SiteFrames";
import { IndustryPageBody } from "@/components/marketing/pages/solutions/IndustryPageBody";
import { ROUTES } from "@/config/site";

const industryScenes: Record<string, { src: string; alt: string }> = {
  "E-commerce": { src: "/images/levers/brand-storefront.jpg", alt: "Shop storefront" },
  "Real estate": { src: "/images/levers/real-estate-court.jpg", alt: "Brand environment" },
  Healthcare: { src: "/images/people/smile-b.jpg", alt: "Care conversation" },
  Education: { src: "/images/people/desk-review.jpg", alt: "Reviewing enrolment work" },
  Fintech: { src: "/images/desks/intelligence.jpg", alt: "Financial scoreboard" },
  Hospitality: { src: "/images/levers/hospitality-table.jpg", alt: "Guests toasting in a restaurant" },
};

const leaks = [
  "Traffic that never becomes a serious enquiry",
  "Enquiries that die in chat or a shared inbox",
  "Brand that looks fine but cannot state the offer",
] as const;

const block = [
  { title: "Weeks 1–2", body: "Name the stuck part. Align brand and demand language." },
  { title: "Weeks 3–8", body: "Fix the path - page, ads, or follow-up - with one owner." },
  { title: "Weeks 9–12", body: "Stabilise the Monday number. Hand the ritual back." },
] as const;

export type IndustrySolutionPageProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  body: readonly [string, string];
  focus: readonly { title: string; body: string }[];
  industryLabel: string;
};

export function IndustrySolutionPage({
  eyebrow,
  title,
  description,
  body,
  focus,
  industryLabel,
}: IndustrySolutionPageProps) {
  const scene = industryScenes[industryLabel] ?? industryScenes["E-commerce"]!;

  return (
    <div className="bg-white text-[#16024A]">
      <FrameStage label={eyebrow} caption={description}>
        <FrameColumns>
          <FramePage>
            <FrameHero
              eyebrow={eyebrow}
              title={title}
              description={description}
              primaryHref={ROUTES.book}
              primaryLabel="Book a strategy call"
              secondaryHref="/solutions"
              secondaryLabel="All solutions"
              image={scene.src}
              imageAlt={scene.alt}
              imagePosition={industryLabel === "Hospitality" ? "object-[center_62%]" : "object-center"}
              stats={[
                { value: industryLabel, label: "Industry lane" },
                { value: String(focus.length), label: "Focus areas" },
              ]}
              names={focus.map((item) => item.title)}
            />
            <SplitFeature
              eyebrow={industryLabel}
              title={body[0]}
              visuals={[]}
              cards={focus.map((item) => ({
                title: item.title,
                body: item.body,
                image: scene.src,
              }))}
            />
            <FeatureBlock
              heading={`Where ${industryLabel} growth usually leaks.`}
              visual={scene.src}
              title="Not every leak is ads."
              body="Often the offer, the page, or the follow-up is the real bottleneck."
              lines={leaks.map((leak) => ({ title: leak }))}
              pills={[{ value: "Free", label: "Start with a check" }]}
              actionHref={ROUTES.book}
              actionLabel="Book a strategy call"
            />
            <ProofBand
              title="A typical block shape."
              body="Exact scope locks after diagnosis. The shape below is how most industry engagements run."
              steps={block.map((item) => ({ title: item.title, body: item.body }))}
              figures={[{ value: "90 days", label: "A typical block" }]}
              href={ROUTES.book}
              label="Book a strategy call"
              secondTitle={focus[focus.length - 1]?.title ?? industryLabel}
              secondBody={focus[focus.length - 1]?.body}
              panelNotes={focus.slice(0, -1).map((item) => ({ title: item.title, body: item.body }))}
              secondHref="/solutions"
              secondLabel="All solutions"
              secondImage="/images/people/desk-review.jpg"
            />
            <ClosingPair
              eyebrow="The work"
              title={`Where ${industryLabel} work usually starts.`}
              lines={[body[0], body[1]]}
              cards={[
                {
                  title: focus[0]?.title ?? industryLabel,
                  body: focus[0]?.body,
                  image: scene.src,
                  href: ROUTES.book,
                  actionLabel: "Book a strategy call",
                },
                {
                  title: focus[focus.length - 1]?.title ?? industryLabel,
                  body: focus[focus.length - 1]?.body,
                  image: "/images/people/desk-review.jpg",
                  href: "/solutions",
                  actionLabel: "All solutions",
                },
              ]}
            />
          </FramePage>
        </FrameColumns>
      </FrameStage>
      <IndustryPageBody industry={industryLabel} />
    </div>
  );
}
