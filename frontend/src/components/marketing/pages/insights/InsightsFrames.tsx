import {
  ClosingPair,
  FrameColumns,
  FrameHero,
  FrameNav,
  FramePage,
  FrameStage,
  SplitFeature,
} from "@/components/marketing/frames/SiteFrames";

type Note = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
};

const faces = [
  "/images/levers/ops-scoreboard.jpg",
  "/images/levers/ops-monday.jpg",
  "/images/levers/demand-phone.jpg",
] as const;

export function InsightsFrames({
  posts,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  posts: readonly Note[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  const [first, second] = posts;

  return (
    <FrameStage label="Insights" caption="Short notes on finding what is stuck, fixing the ads, and how African brands actually sell.">
      <FrameColumns>
        <FramePage>
          <FrameHero
            nav={
              <FrameNav
                links={posts.map((post) => ({ href: `/insights/${post.slug}`, label: post.title }))}
                ctaHref={primaryHref}
                ctaLabel={primaryLabel}
              />
            }
            title={
              <>
                Field notes from the
                <span className="mt-1 block">weekly numbers.</span>
              </>
            }
            description="Short notes on finding what is stuck, fixing the ads, and how African brands actually sell."
            primaryHref={primaryHref}
            primaryLabel={primaryLabel}
            image={faces[0]}
            imageAlt="A weekly numbers review"
            stats={[
              { value: String(posts.length), label: "Notes" },
              { value: "1", label: "Set of numbers" },
            ]}
            names={posts.map((post) => ({ label: post.title, href: `/insights/${post.slug}` }))}
          />
          <SplitFeature
            eyebrow="Insights"
            title="Field notes from the weekly numbers."
            body="Short notes on finding what is stuck, fixing the ads, and how African brands actually sell."
            visuals={[]}
            cards={posts.map((post, index) => ({
              title: post.title,
              body: post.excerpt,
              detail: post.category,
              image: faces[index % faces.length],
              href: `/insights/${post.slug}`,
              actionLabel: post.title,
            }))}
          />
          <ClosingPair
            eyebrow="Insights"
            title="Field notes from the weekly numbers."
            body="Short notes on finding what is stuck, fixing the ads, and how African brands actually sell."
            cards={[
              {
                title: primaryLabel,
                body: first?.excerpt,
                image: faces[0],
                href: primaryHref,
                actionLabel: primaryLabel,
              },
              {
                title: secondaryLabel,
                body: second?.excerpt,
                image: faces[1],
                href: secondaryHref,
                actionLabel: secondaryLabel,
              },
            ]}
          />
        </FramePage>
      </FrameColumns>
    </FrameStage>
  );
}
