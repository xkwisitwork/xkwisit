import { Bot, LineChart, Megaphone, MonitorSmartphone, Palette, type LucideIcon } from "lucide-react";

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
import { StudioCarousel } from "@/components/marketing/studio/Studio";
import { divisions } from "@/config/divisions";
import { services } from "@/config/services";
import { ROUTES } from "@/config/site";

const whenToPick = [
  {
    title: "Brand is fuzzy",
    body: "People like the look but cannot repeat the offer. Start on Brand & creative.",
    href: "/services/branding",
  },
  {
    title: "Traffic without replies",
    body: "Ads or SEO bring visitors who bounce. Fix demand quality and the page first.",
    href: "/services/business-growth",
  },
  {
    title: "Buy path is broken",
    body: "They want to pay and cannot. Website, apps, and payments desk.",
    href: "/services/web-development",
  },
  {
    title: "Follow-up dies in chat",
    body: "Leads sit in WhatsApp. CRM, automation, and sales hygiene.",
    href: "/services/crm-automation",
  },
] as const;

const engagementFlow = [
  { title: "Name the desk", body: "We map pain to one lane - not five proposals at once." },
  { title: "Scope the block", body: "Deliverables, owner, and Monday number written down." },
  { title: "Ship in the open", body: "You see progress in the portal. No surprise end-of-month decks." },
  { title: "Retire or renew", body: "Hand the system back, or extend only if the next problem is clear." },
] as const;

const laneIcons: Record<string, LucideIcon> = {
  technology: MonitorSmartphone,
  growth: Megaphone,
  brand: Palette,
  ai: Bot,
  intelligence: LineChart,
};

const laneScenes: Record<string, string> = {
  technology: "/images/desks/technology.jpg",
  growth: "/images/desks/growth.jpg",
  brand: "/images/desks/brand.jpg",
  ai: "/images/desks/ai.jpg",
  intelligence: "/images/desks/intelligence.jpg",
};

function millions(amount: number) {
  const value = amount / 1_000_000;
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function ServicesFrames() {
  const list = [...services].sort((a, b) => a.order - b.order);
  const floors = list.filter((service) => service.startingFrom > 0);

  return (
    <FrameStage
      label="Services"
      caption="Brand, getting customers, the website or app, AI tools, and clear numbers. You only need the desk that is hurting sales right now."
    >
      <FrameColumns>
        <FramePage>
          <FrameHero
            title={
              <>
                Five kinds of work.
                <span className="mt-1 block">One team.</span>
              </>
            }
            description="Brand, getting customers, the website or app, AI tools, and clear numbers. You only need the desk that is hurting sales right now."
            primaryHref={ROUTES.book}
            primaryLabel="Book a strategy call"
            secondaryHref={ROUTES.pricing}
            secondaryLabel="View pricing"
            image="/images/desks/growth.jpg"
            imageAlt="Growth and marketing work"
            stats={[
              { value: "5 desks", label: "Clear lanes of work" },
              { value: "1 problem", label: "We name first" },
            ]}
            names={[
              ...divisions.map((desk) => ({ label: desk.title, href: desk.href })),
              ...floors.map((service) => ({
                label: `${service.name} ${millions(service.startingFrom)}`,
                href: `/services/${service.slug}`,
              })),
            ]}
          />
          <SplitFeature
            eyebrow="Desks"
            title="Five lanes. You only need the one leaking now."
            visuals={[]}
            cards={divisions.map((desk) => ({
              title: desk.title,
              body: desk.stake,
              detail: desk.outcome,
              image: laneScenes[desk.id],
              href: desk.href,
              icon: laneIcons[desk.id],
            }))}
          />
          <FeatureBlock
            heading="Not sure which desk? Match the symptom."
            visual={laneScenes.brand ?? ""}
            title=""
            lines={whenToPick.map((item) => ({ title: item.title, body: item.body }))}
            actionHref={ROUTES.book}
            actionLabel="Book a strategy call"
          />
          <ProofBand
            title="From symptom to a finished block of work."
            steps={engagementFlow.map((step) => ({ title: step.title, body: step.body }))}
            href={ROUTES.book}
            label="Book a strategy call"
            secondTitle="Published floors."
            secondBody="Exact scope after we name the problem. Compare packages or talk it through."
            secondFigures={floors.map((service) => ({
              value: millions(service.startingFrom),
              label: service.name,
            }))}
            secondHref={ROUTES.pricing}
            secondLabel="View pricing"
          />
          <ClosingPair
            eyebrow="Desks"
            title="Not sure which desk? Match the symptom."
            cards={[
              {
                title: whenToPick[2].title,
                body: whenToPick[2].body,
                image: laneScenes.technology,
                href: whenToPick[2].href,
                actionLabel: whenToPick[2].title,
              },
              {
                title: whenToPick[3].title,
                body: whenToPick[3].body,
                image: laneScenes.ai,
                href: whenToPick[3].href,
                actionLabel: "Book a strategy call",
              },
            ]}
          />
        </FramePage>
      </FrameColumns>

      <div className="mt-5 overflow-hidden rounded-[1.6rem] bg-white shadow-[0_24px_60px_-36px_rgba(22,2,74,0.35)]">
        <StudioCarousel
          title="Deep pages for each engagement type."
          description="Taglines, deliverables, and fit notes live on each service URL."
          items={list.map((service) => ({
            title: service.name,
            body: `${service.tagline} ${service.deliverables.slice(0, 3).join(" · ")}`,
            href: `/services/${service.slug}`,
          }))}
        />
      </div>
    </FrameStage>
  );
}
