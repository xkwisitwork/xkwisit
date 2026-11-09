import {
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  CheckSquare,
  ClipboardCheck,
  FileBarChart,
  FileText,
  Gauge,
  Handshake,
  Inbox,
  LayoutDashboard,
  Layers,
  Megaphone,
  MessagesSquare,
  Palette,
  Rocket,
  Plug,
  Settings,
  ShoppingBag,
  Target,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * Client portal navigation.
 * Everything a client sees inside their own workspace.
 */

export type PortalNavItem = {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  badge?: "attention" | "approvals" | "messages" | "notifications" | null;
  exact?: boolean;
  children?: PortalNavItem[];
};

export type PortalNavSection = {
  id: string;
  label?: string;
  items: PortalNavItem[];
};

export const portalNavSections: PortalNavSection[] = [
  {
    id: "home",
    items: [
      {
        id: "portal-home",
        label: "Home",
        href: "/home",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        id: "attention",
        label: "Needs Your Attention",
        href: "/attention",
        icon: Bell,
        badge: "attention",
      },
      {
        id: "brief",
        label: "Executive Brief",
        href: "/brief",
        icon: FileText,
      },
      {
        id: "roadmap",
        label: "Growth Roadmap",
        href: "/roadmap",
        icon: Rocket,
      },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    items: [
      {
        id: "performance-hub",
        label: "Overview",
        href: "/performance",
        icon: BarChart3,
        children: [
          {
            id: "performance-traffic",
            label: "Traffic",
            href: "/performance/traffic",
            icon: TrendingUp,
          },
          {
            id: "performance-leads",
            label: "Leads",
            href: "/performance/leads",
            icon: Users,
          },
          {
            id: "performance-sales",
            label: "Sales",
            href: "/performance/sales",
            icon: Wallet,
          },
          {
            id: "performance-revenue",
            label: "Revenue",
            href: "/performance/revenue",
            icon: Wallet,
          },
          {
            id: "performance-funnel",
            label: "Funnel",
            href: "/performance/funnel",
            icon: Target,
          },
        ],
      },
    ],
  },
  {
    id: "delivery",
    label: "Delivery",
    items: [
      {
        id: "portal-projects",
        label: "Projects",
        href: "/portal/projects",
        icon: Layers,
      },
      {
        id: "portal-campaigns",
        label: "Campaigns",
        href: "/portal/campaigns",
        icon: Megaphone,
      },
      {
        id: "portal-content",
        label: "Content",
        href: "/portal/content",
        icon: FileText,
        children: [
          {
            id: "content-calendar",
            label: "Calendar",
            href: "/portal/content/calendar",
            icon: Calendar,
          },
          {
            id: "content-approvals",
            label: "Approvals",
            href: "/portal/content/approvals",
            icon: ClipboardCheck,
          },
        ],
      },
      {
        id: "portal-brand",
        label: "Brand",
        href: "/portal/brand",
        icon: Palette,
        children: [
          {
            id: "brand-assets",
            label: "Assets",
            href: "/portal/brand/assets",
            icon: Layers,
          },
        ],
      },
      {
        id: "portal-leads",
        label: "Leads",
        href: "/leads",
        icon: Handshake,
      },
      {
        id: "portal-approvals",
        label: "Approvals",
        href: "/portal/approvals",
        icon: ClipboardCheck,
        badge: "approvals",
      },
    ],
  },
  {
    id: "reports",
    label: "Reports & Finance",
    items: [
      {
        id: "portal-reports",
        label: "Reports",
        href: "/portal/reports",
        icon: FileBarChart,
      },
      {
        id: "portal-invoices",
        label: "Invoices",
        href: "/invoices",
        icon: Wallet,
      },
      {
        id: "portal-proposals",
        label: "Proposals",
        href: "/proposals",
        icon: FileText,
      },
      {
        id: "portal-contracts",
        label: "Contracts",
        href: "/contracts",
        icon: FileText,
      },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    items: [
      {
        id: "portal-messages",
        label: "Messages",
        href: "/messages",
        icon: MessagesSquare,
        badge: "messages",
      },
      {
        id: "portal-files",
        label: "Files",
        href: "/files",
        icon: Layers,
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    items: [
      {
        id: "portal-settings",
        label: "Settings",
        href: "/portal/settings",
        icon: Settings,
        children: [
          {
            id: "portal-settings-profile",
            label: "Profile",
            href: "/portal/settings/profile",
            icon: UserCog,
          },
          {
            id: "portal-settings-company",
            label: "Company",
            href: "/portal/settings/company",
            icon: Building2,
          },
          {
            id: "portal-settings-users",
            label: "Users",
            href: "/portal/settings/users",
            icon: Users,
          },
          {
            id: "portal-settings-notifications",
            label: "Notifications",
            href: "/portal/settings/notifications",
            icon: Bell,
          },
          {
            id: "portal-settings-integrations",
            label: "Integrations",
            href: "/portal/settings/integrations",
            icon: Plug,
          },
        ],
      },
    ],
  },
];

export function flattenPortalNav(
  sections: PortalNavSection[] = portalNavSections,
): PortalNavItem[] {
  const out: PortalNavItem[] = [];

  function walk(items: PortalNavItem[]) {
    for (const item of items) {
      out.push(item);

      if (item.children) walk(item.children);
    }
  }

  sections.forEach((section) => walk(section.items));

  return out;
}

export const flatPortalNavItems: PortalNavItem[] = flattenPortalNav();

export { Gauge, Briefcase, ShoppingBag };
