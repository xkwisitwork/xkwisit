import { PageFaq } from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";

const faqs = [
  {
    q: "Why so few public case studies?",
    a: "Many African operators prefer privacy. We would rather publish fewer honest pages than invent logos.",
  },
  {
    q: "Can I get an example in my industry?",
    a: "Ask on the call. We will share a permissioned story or a sanitized shape that matches your leak.",
  },
] as const;

export function CaseStudiesPageBody() {
  return (
    <>
      <PageFaq title="Case study questions" items={faqs} />
      <SolteraCloser />
    </>
  );
}
