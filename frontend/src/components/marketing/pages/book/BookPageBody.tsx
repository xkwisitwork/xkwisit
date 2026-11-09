import { PageFaq, PageSection } from "@/components/marketing/pages/shared";
import {
  BookCoverDash,
  BookGuardDash,
  BookOutcomesDash,
  BookPrepareDash,
} from "@/components/marketing/pages/book/BookDash";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { ROUTES } from "@/config/site";

const covers = [
  { title: "What feels stuck", body: "We name one leak - not a tour of every channel." },
  { title: "What you already tried", body: "So we do not resell the same campaign under a new name." },
  { title: "The first move", body: "A concrete action you can run this week." },
] as const;

const prepare = [
  "One growth question (not a laundry list)",
  "Order-of-magnitude spend on ads or marketing",
  "Where leads die today",
  "Who owns brand vs ads vs WhatsApp follow-up",
] as const;

const leaveWith = [
  "A plain-language problem statement",
  "Whether a free check or a paid block fits next",
  "Who on our side would own the first desk",
] as const;

const neverDo = [
  "Pitch a 40-slide deck on the first call",
  "Promise a revenue multiple without seeing your funnel",
  "Push spend before diagnosis",
] as const;

const faqs = [
  {
    q: "How long is the call?",
    a: "Thirty minutes on the clock - Lagos time.",
  },
  {
    q: "Who should join?",
    a: "The owner or the person who can decide spend. Extra observers are fine if they stay quiet until the end.",
  },
  {
    q: "Is the call a sales trap?",
    a: "No hard close script. Fit first, then a plan only if it makes sense.",
  },
  {
    q: "What timezone?",
    a: "Slots are Lagos time. Pick what works; we confirm by email.",
  },
] as const;

export function BookPageBody() {
  return (
    <>
      <PageSection eyebrow="On the call" title="What we cover once you join.">
        <div className="grid items-start gap-4 tablet:gap-5 laptop:grid-cols-2">
          <BookCoverDash items={covers} />
          <BookOutcomesDash
            items={leaveWith}
            leadSupport={[
              "Leave knowing the one problem to fix first.",
              "We will say if we are a fit. If not, we still leave you with the problem named.",
            ]}
          />
        </div>
      </PageSection>

      <PageSection tone="soft" eyebrow="Prepare" title="Bring these - rough is fine.">
        <div className="grid gap-4 tablet:gap-5 laptop:grid-cols-[1.15fr_0.85fr]">
          <BookPrepareDash items={prepare} />
          <BookGuardDash items={neverDo} />
        </div>
      </PageSection>

      <PageFaq
        title="Booking questions"
        description="Length, attendees, timezone, and what the call is for."
        items={faqs}
      />
      <SolteraCloser
        title="Prefer a free check first?"
        body="See what’s stuck in about 10 minutes - no call required."
        primaryHref={ROUTES.growthAssessment}
        primaryLabel="Start free check"
        secondaryHref={ROUTES.businessXray}
        secondaryLabel="Run a Business X-Ray"
      />
    </>
  );
}
