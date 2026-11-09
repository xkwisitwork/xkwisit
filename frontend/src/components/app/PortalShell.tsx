"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { PortalSidebar } from "@/components/app/PortalSidebar";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ClientContextProvider } from "@/contexts/ClientContext";
import { NotificationContextProvider } from "@/contexts/NotificationContext";
import type { Session } from "@/types/auth";
import type { Client, ClientContact } from "@/types/client";

export type PortalShellProps = {
  children: ReactNode;
  session: Session;
  client: Client | null;
  contacts: ClientContact[];
};

/**
 * Client wrapper for the (portal) route group.
 */
export function PortalShell({ children, session, client, contacts }: PortalShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <AuthContextProvider key={session.user.id} initialSession={session}>
      <ClientContextProvider initialClient={client} initialContacts={contacts}>
        <NotificationContextProvider>
          <div
            className="flex h-dvh max-h-dvh overflow-hidden bg-[#F7F5FC]"
            data-shell="portal"
          >
            {menuOpen ? (
              <button
                type="button"
                aria-label="Close menu"
                className="fixed inset-0 z-40 bg-[#0B021F]/55 tablet:hidden"
                onClick={() => setMenuOpen(false)}
              />
            ) : null}
            <PortalSidebar mobileOpen={menuOpen} />

            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-[#E7DEFF] bg-white px-4 tablet:hidden">
                <button
                  type="button"
                  aria-label="Open menu"
                  onClick={() => setMenuOpen(true)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#E7DEFF] text-[#16024A]"
                >
                  <Menu className="h-4 w-4" />
                </button>
                <p className="font-display text-[0.95rem] font-semibold text-[#16024A]">
                  Client portal
                </p>
              </header>
              <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
                <div className="w-full min-w-0 px-3 py-4 mobile-md:px-4 tablet:px-5 tablet:py-5 laptop:px-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </NotificationContextProvider>
      </ClientContextProvider>
    </AuthContextProvider>
  );
}
