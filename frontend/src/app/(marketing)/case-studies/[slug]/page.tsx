import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { CaseStudyDetailFrames } from "@/components/marketing/pages/cases/CaseStudyGallery";

const cases = {
  "northline-commerce": {
    title: "Northline Commerce",
    result: "3.2× more deals in two quarters",
    summary:
      "A clearer offer and a rebuilt landing page turned the same visitors into people ready to buy.",
    body: "Northline was spending more on ads while the offer stayed fuzzy. We ran the X-ray, rewrote how they described the product, rebuilt the landing page, and put brand and ads on the same Monday numbers. More deals came in within two quarters.",
    image: "/images/levers/brand-storefront.jpg",
  },
  "harbor-health": {
    title: "Harbor Health",
    result: "41% lower CAC",
    summary:
      "The brand, the content, and the follow-up finally pointed at the same patient bookings.",
    body: "Harbor’s channels competed for credit and ignored CRM follow-up. We aligned messaging, content, and stage hygiene so every lead had an owner - CAC dropped while enrolment quality rose.",
    image: "/images/people/smile-b.jpg",
  },
  "ledger-labs": {
    title: "Ledger Labs",
    result: "Win rate +19pts",
    summary: "Clearer sales stages, and ads that matched them, unstuck the deals.",
    body: "Ledger’s ads kept filling the top while the sales stages drifted. We agreed what each stage meant, how coaching would run, and who got the next lead, so ads and sales shared one problem each week.",
    image: "/images/levers/sales-pipeline.jpg",
  },
} as const;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = cases[params.slug as keyof typeof cases];
  return {
    title: item?.title ?? "Case study",
    description: item?.summary,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const item = cases[params.slug as keyof typeof cases];
  if (!item) notFound();

  const others = Object.entries(cases).filter(([slug]) => slug !== params.slug);

  return (
    <div className="bg-white text-[#16024A]">
      <CaseStudyDetailFrames
        item={{ ...item, slug: params.slug }}
        others={others.map(([slug, other]) => ({
          slug,
          title: other.title,
          result: other.result,
          summary: other.summary,
          image: other.image,
        }))}
      />
      <SolteraCloser />
    </div>
  );
}
