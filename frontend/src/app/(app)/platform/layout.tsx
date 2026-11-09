import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";

/**
 * Server-side platform gate. Nav UI alone is not enough — JWT claim must
 * prove platform admin before any /platform page renders.
 */
export default async function PlatformLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=/platform");
  }

  if (!session.user.isPlatformAdmin) {
    redirect("/dashboard");
  }

  return children;
}
