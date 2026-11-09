import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/app";
import { getSession } from "@/lib/auth/session";
import type { Organization } from "@/types/organization";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // In a full implementation this would be fetched from the API.
  // For now the shell accepts `null` and displays the default organization slot.
  const organization: Organization | null = null;

  return (
    <AppShell session={session} organization={organization}>
      {children}
    </AppShell>
  );
}
