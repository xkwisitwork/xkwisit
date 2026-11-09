import { PageFaq } from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";

const faqs = [
  {
    q: "How often do you publish?",
    a: "When a live engagement teaches something transferable. No fake weekly content calendar.",
  },
  {
    q: "Can I republish a note?",
    a: "Ask first. Link back if we approve. Do not strip the diagnosis framing.",
  },
] as const;

export function InsightsPageBody() {
  return (
    <>
      <PageFaq title="Insights questions" items={faqs} />
      <SolteraCloser />
    </>
  );
}
