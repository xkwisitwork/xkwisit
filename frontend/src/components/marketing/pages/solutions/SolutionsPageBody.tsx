import { PageFaq } from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";

const faqs = [
  {
    q: "Do you only work in these six industries?",
    a: "Those pages are common lanes. If your sector is adjacent, we still start with diagnosis.",
  },
  {
    q: "Should I pick industry or services first?",
    a: "If your buyer path is unusual, start on Solutions. If you already know the desk, start on Services.",
  },
] as const;

export function SolutionsPageBody() {
  return (
    <>
      <PageFaq title="Solutions questions" items={faqs} />
      <SolteraCloser />
    </>
  );
}
