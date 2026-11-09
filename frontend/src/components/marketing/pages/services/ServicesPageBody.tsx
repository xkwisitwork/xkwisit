import { PageFaq } from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { ServicesFrames } from "@/components/marketing/pages/services/ServicesFrames";

const faqs = [
  {
    q: "Do I buy every desk?",
    a: "No. Most clients start on the one desk that is hurting sales. We expand only when the next bottleneck is obvious.",
  },
  {
    q: "Are service pages the same as packages?",
    a: "Service pages describe the work. Packages on Pricing describe how we bill a block. We match them on the call.",
  },
  {
    q: "Can you only do branding or only ads?",
    a: "Yes - if that is the stuck part. We still check that brand and ads share the same Monday number.",
  },
  {
    q: "Where do I see pricing?",
    a: "Published floors live on Pricing. Exact scope after we name the problem.",
  },
] as const;

export function ServicesPageBody() {
  return (
    <>
      <ServicesFrames />
      <PageFaq
        title="Services questions"
        description="How desks, packages, and fit work together."
        items={faqs}
      />
      <SolteraCloser />
    </>
  );
}
