import Link from "next/link";

import type { NavItem } from "@/config/navigation/marketingNav";

export type FooterColumnProps = {
  title: string;
  items: NavItem[];
};

export function FooterColumn({ title, items }: FooterColumnProps) {
  return (
    <div>
      <p className="mb-4 text-[0.78rem] font-semibold text-white">{title}</p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[0.88rem] text-white/45 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
