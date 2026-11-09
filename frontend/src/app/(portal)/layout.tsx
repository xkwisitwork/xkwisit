import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { PortalShell } from "@/components/app/PortalShell";
import { getSession } from "@/lib/auth/session";
import type { Client, ClientContact } from "@/types/client";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // In a full implementation, these would be fetched from the API using the
  // session's organizationId / clientId.
  const client: Client | null = null;
  const contacts: ClientContact[] = [];

  return (
    <PortalShell session={session} client={client} contacts={contacts}>
      {children}
    </PortalShell>
  );
}
