import type { ReactNode } from "react";

export default function ClientDetailLayout({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}
