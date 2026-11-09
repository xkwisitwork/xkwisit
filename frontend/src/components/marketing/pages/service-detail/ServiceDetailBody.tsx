import { PageFaq } from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";

export function ServiceDetailBody({
  serviceName,
  category: _category,
}: {
  serviceName: string;
  category: string;
}) {
  const faqs = [
    {
      q: `Is ${serviceName} sold alone?`,
      a: `Yes, when that is the stuck part. We still check that ${serviceName} shares a Monday number with brand and sales.`,
    },
    {
      q: "How long before we see movement?",
      a: "Depends on the leak. We set a 90-day block so there is time to diagnose, fix, and check - not just launch once.",
    },
    {
      q: "Where does pricing live?",
      a: "Published floors are on Pricing. Final scope after the call.",
    },
  ] as const;

  return (
    <>
      <PageFaq title={`${serviceName} questions`} items={[...faqs]} />
      <SolteraCloser />
    </>
  );
}
