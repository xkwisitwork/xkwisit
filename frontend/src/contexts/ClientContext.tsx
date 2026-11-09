"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Client, ClientContact } from "@/types/client";
import type { ID } from "@/types/common";

type ClientContextValue = {
  client: Client | null;
  clientId: ID | null;
  contacts: ClientContact[];
  primaryContact: ClientContact | null;
  isLoading: boolean;
  setClient: (client: Client | null) => void;
  setContacts: (contacts: ClientContact[]) => void;
};

const ClientContext = createContext<ClientContextValue | null>(null);

/**
 * Client workspace provider.
 * Mounted at the root of `(app)/clients/[clientId]` and any client-scoped
 * routes so every tab can read the active client without re-fetching.
 */
export function ClientContextProvider({
  children,
  initialClient = null,
  initialContacts = [],
}: {
  children: ReactNode;
  initialClient?: Client | null;
  initialContacts?: ClientContact[];
}) {
  const [client, setClient] = useState<Client | null>(initialClient);
  const [contacts, setContacts] = useState<ClientContact[]>(initialContacts);

  const primaryContact = useMemo(
    () => contacts.find((c) => c.isPrimary) ?? contacts[0] ?? null,
    [contacts],
  );

  const value = useMemo<ClientContextValue>(
    () => ({
      client,
      clientId: client?.id ?? null,
      contacts,
      primaryContact,
      isLoading: false,
      setClient,
      setContacts,
    }),
    [client, contacts, primaryContact],
  );

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
}

export function useClient(): ClientContextValue {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error("useClient must be used within a ClientContextProvider");
  }

  return context;
}
