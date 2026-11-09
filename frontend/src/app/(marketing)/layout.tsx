import type { ReactNode } from "react";

import { BrowseReturnTracker } from "@/components/marketing/BrowseReturnTracker";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { VisitBeacon } from "@/components/marketing/VisitBeacon";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      <VisitBeacon />
      <BrowseReturnTracker />
      <div className="flex min-h-screen flex-col bg-white text-neutral-900">
        <MarketingHeader />
        <main className="flex-1 pt-[4.25rem] tablet:pt-[4.75rem]">{children}</main>
        <MarketingFooter />
      </div>
    </CurrencyProvider>
  );
}
