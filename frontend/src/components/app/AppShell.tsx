"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AppSidebar } from "@/components/app/AppSidebar";
import { AppTopbar } from "@/components/app/AppTopbar";
import { TrialBanner } from "@/components/app/TrialBanner";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { BillingContextProvider } from "@/contexts/BillingContext";
import { CommandPaletteContextProvider } from "@/contexts/CommandPaletteContext";
import { NotificationContextProvider } from "@/contexts/NotificationContext";
import { OrganizationContextProvider } from "@/contexts/OrganizationContext";
import type { Session } from "@/types/auth";
import type { Organization } from "@/types/organization";

export type AppShellProps = {
  children: ReactNode;
  session: Session;
  organization: Organization | null;
};

export function AppShell({ children, session, organization }: AppShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Keep document scroll locked so only `<main>` moves — sidebar stays full-height.
  useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  // Key the provider tree by user id so a soft account switch remounts
  // auth/org/billing/notification state instead of merging leftovers.
  return (
    <AuthContextProvider key={session.user.id} initialSession={session}>
      <OrganizationContextProvider initialOrganization={organization}>
        <BillingContextProvider>
          <NotificationContextProvider>
            <CommandPaletteContextProvider>
              <div
                className="flex h-dvh max-h-dvh overflow-hidden bg-[#F3F0F8]"
                data-shell="app"
              >
                {menuOpen ? (
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="fixed inset-0 z-40 bg-[#0B021F]/55 tablet:hidden"
                    onClick={() => setMenuOpen(false)}
                  />
                ) : null}

                <AppSidebar mobileOpen={menuOpen} onCloseMobile={() => setMenuOpen(false)} />

                <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                  <AppTopbar onMenu={() => setMenuOpen(true)} />

                  <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="flex w-full min-w-0 flex-col gap-4 px-3 py-4 mobile-md:px-4 tablet:px-5 tablet:py-5 laptop:px-6">
                      <TrialBanner />
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </CommandPaletteContextProvider>
          </NotificationContextProvider>
        </BillingContextProvider>
      </OrganizationContextProvider>
    </AuthContextProvider>
  );
}
