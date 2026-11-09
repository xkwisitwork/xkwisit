import type { ReactNode } from "react";

export default function CrmLayout({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}
