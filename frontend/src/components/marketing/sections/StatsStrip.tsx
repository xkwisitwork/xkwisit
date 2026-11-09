import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const stats = [
  { value: "40+", label: "Growth systems shipped" },
  { value: "3×", label: "Median lift in deals" },
  { value: "12 wk", label: "Typical diagnose → operate cycle" },
  { value: "NG + global", label: "Teams we partner with" },
] as const;

export function StatsStrip() {
  return (
    <Section spacing="md" contained={false}>
      <Container>
        <dl className="grid gap-8 border-y border-neutral-400 py-10 tablet:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-300 font-medium uppercase tracking-wider text-neutral-600">
                {stat.label}
              </dt>
              <dd className="mt-2 font-display text-700 tracking-tight text-neutral-900">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
