import type { ReactNode } from "react";

export default function LeadDetailLayout({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}
