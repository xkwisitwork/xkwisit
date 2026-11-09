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
import { ServiceDetailBody } from "@/components/marketing/pages/service-detail/ServiceDetailBody";
import { SERVICE_CATEGORY_LABELS, type Service } from "@/config/services";
import { ROUTES } from "@/config/site";

const scenes: Record<string, { src: string; alt: string }> = {
  branding: { src: "/images/desks/brand.jpg", alt: "Brand and content studio" },
  content: { src: "/images/levers/demand-content.jpg", alt: "Content planning" },
  "business-growth": { src: "/images/desks/growth.jpg", alt: "Growth planning" },
  "web-development": {
    src: "/images/desks/technology.jpg",
    alt: "Web, mobile app, and product engineering work",
  },
  seo: { src: "/images/levers/demand-search.jpg", alt: "Search and demand work" },
  "paid-media": { src: "/images/levers/demand-phone.jpg", alt: "Paid demand on a phone" },
  "crm-automation": { src: "/images/levers/sales-pipeline.jpg", alt: "Sales pipeline" },
  consulting: { src: "/images/people/method-owner.jpg", alt: "Owner in a working session" },
  "profit-optimization": { src: "/images/desks/intelligence.jpg", alt: "Numbers and scoreboard" },
};

const system = [
  "Maps to one desk owner",
  "Reports into one Monday number",
  "Hands back a ritual your team can keep",
] as const;

export function ServiceDetailView({ service }: { service: Service }) {
  const category = SERVICE_CATEGORY_LABELS[service.category];
  const scene = scenes[service.slug] ?? scenes.branding!;
  const price = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: service.currency,
    maximumFractionDigits: 0,
  }).format(service.startingFrom);

  const week = [
    { title: "Kickoff", body: `Confirm the ${service.name} problem in one sentence.` },
    { title: "Build", body: "Ship in the portal. You see drafts and decisions." },
    { title: "Check", body: "Monday number. Keep, cut, or rename the problem." },
  ] as const;

  return (
    <div className="bg-white text-[#16024A]">
      <FrameStage
        label={service.popular ? `${category} · Popular` : category}
        caption={service.tagline}
      >
        <FrameColumns>
          <FramePage>
            <FrameHero
              eyebrow={category}
              title={service.name}
              description={service.description}
              primaryHref={ROUTES.book}
              primaryLabel="Book a strategy call"
              secondaryHref={ROUTES.services}
              secondaryLabel="All services"
              image={scene.src}
              imageAlt={scene.alt}
              stats={[
                { value: price, label: "Starting from" },
                { value: "90 days", label: "Block" },
              ]}
              names={service.deliverables}
            />
            <SplitFeature
              eyebrow={category}
              title={service.tagline}
              body={service.description}
              notes={system.map((line) => ({ title: line }))}
              visuals={[]}
              cards={service.deliverables.map((item) => ({ title: item }))}
            />
            <FeatureBlock
              heading="Written deliverables, not a slide that dies in Drive."
              visual={scene.src}
              title={`Where ${service.name} sits in the wider system.`}
              body="Useful alone when this is the bottleneck - dangerous as a silo if ads and sales still argue."
              lines={[{ title: "What working looks like." }, ...week.map((item) => ({ title: item.title, body: item.body }))]}
              pills={[
                { value: price, label: "Starting from" },
                { value: "90 days", label: "Block" },
              ]}
              actionHref={ROUTES.book}
              actionLabel="Book this engagement"
            />
            <ProofBand
              title="Good fit when."
              body={`Clear signals that ${service.name.toLowerCase()} is the bottleneck worth a 90-day block. Read each one against your Monday number before you book.`}
              steps={service.goodFor.map((item) => ({
                title: item.title,
                body: item.body,
              }))}
              figures={[{ value: String(service.deliverables.length), label: "Deliverables" }]}
              href={ROUTES.book}
              label="Book this engagement"
              image={scene.src}
              secondTitle="Not for."
              secondBody="Honest filters so the block stays sharp—and the outcomes we aim for when the fit is right."
              panelNotes={[
                ...service.notFor.map((item) => ({
                  title: item.title,
                  body: item.body,
                  variant: "filter" as const,
                })),
                ...service.outcomes.slice(0, 2).map((item, index) => ({
                  title: item,
                  body:
                    index === 0
                      ? `When ${service.name.toLowerCase()} is the stuck part, this is the first result we protect on the scoreboard.`
                      : `A secondary win we expect inside the same 90-day block—visible to sales and leadership, not only marketing.`,
                })),
              ]}
              secondHref={ROUTES.services}
              secondLabel="All services"
              secondImage="/images/people/desk-review.jpg"
            />
            <ClosingPair
              eyebrow={category}
              title={service.name}
              lines={[
                "When the block ends.",
                "You keep the scoreboard, the briefs, and the owners.",
                "We do not vanish with the files in a private drive.",
                "Extend only if the next stuck part is clear.",
              ]}
              cards={[
                {
                  title: service.outcomes[0] ?? service.name,
                  body: service.idealFor.join(", "),
                  image: scene.src,
                  href: ROUTES.book,
                  actionLabel: "Book this engagement",
                },
                {
                  title: service.outcomes[1] ?? service.tagline,
                  body: service.deliverables[service.deliverables.length - 1],
                  image: "/images/people/desk-review.jpg",
                  href: ROUTES.services,
                  actionLabel: "All services",
                },
              ]}
            />
          </FramePage>
        </FrameColumns>
      </FrameStage>
      <ServiceDetailBody serviceName={service.name} category={category} />
    </div>
  );
}
