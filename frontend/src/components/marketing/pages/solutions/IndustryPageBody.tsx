import { PageFaq } from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";

export function IndustryPageBody({ industry }: { industry: string }) {
  const faqs = [
    {
      q: `Do you only work with ${industry} brands?`,
      a: `No - but this page is written for ${industry} buyer paths. The diagnosis method is shared across industries.`,
    },
    {
      q: "Will you reuse a generic playbook?",
      a: `We reuse the diagnosis ritual. Creative, offers, and follow-up are rewritten for ${industry} reality.`,
    },
    {
      q: "How do we start?",
      a: "Free X-Ray or assessment, or a 30-minute call. We name the stuck part before a package.",
    },
  ] as const;

  return (
    <>
      <PageFaq title={`${industry} questions`} items={[...faqs]} />
      <SolteraCloser />
    </>
  );
}
