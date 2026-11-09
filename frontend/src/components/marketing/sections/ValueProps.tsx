import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const pillars = [
  {
    title: "Built on diagnosis, not guesswork",
    body: "Every engagement starts with a growth X-ray across brand, demand, sales, and retention - so we only invest where the system is actually failing.",
  },
  {
    title: "100+ signals, one clear priority",
    body: "We read the ads, the pages, the follow-up, and how sales talks. You get one problem to fix this week.",
  },
  {
    title: "Insights timed to the decision",
    body: "When a channel, offer, or stage starts leaking, we surface the move while it still matters - before another quarter of spend is wasted.",
  },
] as const;

/**
 * Three-column proof strip under the hero.
 */
export function ValueProps() {
  return (
    <Section spacing="lg" contained={false} className="bg-white">
      <Container>
        <h2 className="mx-auto max-w-2xl text-center font-display text-700 font-bold tracking-tight text-neutral-900 tablet:text-800">
          Sharper diagnosis.
          <span className="block text-primary">Stronger outcomes.</span>
        </h2>

        <ul className="mt-14 grid gap-10 tablet:grid-cols-3 tablet:gap-8">
          {pillars.map((pillar) => (
            <li key={pillar.title} className="text-center tablet:text-left">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 tablet:mx-0">
                <span className="font-display text-500 font-bold text-primary">X</span>
              </div>
              <h3 className="font-sans text-500 font-semibold tracking-tight text-neutral-900">
                {pillar.title}
              </h3>
              <p className="mt-3 text-400 leading-relaxed text-neutral-600">
                {pillar.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
