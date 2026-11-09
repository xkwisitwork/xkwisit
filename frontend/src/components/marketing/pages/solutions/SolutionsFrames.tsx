import {
  Building2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

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
import { ROUTES } from "@/config/site";

type Industry = {
  href: string;
  title: string;
  tagline: string;
  image: string;
};

const laneIcons: Record<string, LucideIcon> = {
  "E-commerce": ShoppingBag,
  "Real estate": Building2,
  Healthcare: HeartPulse,
  Education: GraduationCap,
  Fintech: Landmark,
  Hospitality: Hotel,
};

const method = [
  { title: "Same diagnosis", body: "Find what is stuck before we fix spend - clinic or shop." },
  { title: "Different buyer path", body: "A patient booking is not a cart checkout. Language and follow-up change." },
  { title: "One Monday number", body: "Industry colour does not excuse three competing dashboards." },
] as const;

export function SolutionsFrames({ industries }: { industries: readonly Industry[] }) {
  const lead = industries.slice(0, 3);
  const rest = industries.slice(3);

  return (
    <FrameStage
      label="Solutions"
      caption="A clinic, a shop, and a developer do not need the same ads. They need the stuck part named - then fixed."
    >
      <FrameColumns>
        <FramePage>
          <FrameHero
            title={
              <>
                Same method.
                <span className="mt-1 block">Different buyer pain.</span>
              </>
            }
            description="A clinic, a shop, and a developer do not need the same ads. They need the stuck part named - then fixed."
            primaryHref={ROUTES.book}
            primaryLabel="Book a strategy call"
            secondaryHref={ROUTES.services}
            secondaryLabel="See services"
            image={lead[0]?.image}
            imageAlt={lead[0]?.title}
            stats={[
              { value: "6", label: "Industry lanes" },
              { value: "1 method", label: "Find then fix" },
            ]}
            names={industries.map((item) => ({ label: item.title, href: item.href }))}
          />
          <SplitFeature
            eyebrow="Industries"
            title="Choose the lane that matches how your buyers actually buy."
            notes={method.map((item) => ({ title: item.title, body: item.body }))}
            visuals={[]}
            cards={industries.map((item) => ({
              title: item.title,
              body: item.tagline,
              image: item.image,
              href: item.href,
              actionLabel: item.title,
              icon: laneIcons[item.title],
            }))}
          />
          <FeatureBlock
            heading="Same rules. Different buyer pain."
            visual={lead[2]?.image ?? lead[0]?.image ?? ""}
            title=""
            lines={[
              {
                title: "Industry matters when…",
                body: "Compliance, trust cues, or offline close change the funnel shape.",
              },
              {
                title: "Industry matters less when…",
                body: "The real leak is a fuzzy offer or dead WhatsApp follow-up - universal problems.",
              },
            ]}
            pills={[{ value: "Free", label: "Start with a check" }]}
            actionHref={ROUTES.book}
            actionLabel="Book a strategy call"
          />
          <ProofBand
            title={method[0].title}
            body={method[0].body}
            steps={method.map((item) => ({ title: item.title, body: item.body }))}
            href={ROUTES.services}
            label="See services"
            secondTitle="Should I pick industry or services first?"
            secondBody="If your buyer path is unusual, start on Solutions. If you already know the desk, start on Services."
            panelNotes={[
              {
                title: "Do you only work in these six industries?",
                body: "Those pages are common lanes. If your sector is adjacent, we still start with diagnosis.",
              },
            ]}
            secondHref={ROUTES.book}
            secondLabel="Book a strategy call"
            secondImage={rest[1]?.image}
          />
          {rest[1] && rest[2] ? (
            <ClosingPair
              eyebrow="Lanes"
              title="Open an industry lane or book a call."
              cards={[
                {
                  title: rest[1].title,
                  body: rest[1].tagline,
                  image: rest[1].image,
                  href: rest[1].href,
                  actionLabel: rest[1].title,
                },
                {
                  title: rest[2].title,
                  body: rest[2].tagline,
                  image: rest[2].image,
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
