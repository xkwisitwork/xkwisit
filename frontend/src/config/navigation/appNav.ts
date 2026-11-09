import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  CheckSquare,
  ChevronRight,
  ClipboardCheck,
  Cog,
  FileBarChart,
  FileText,
  Gauge,
  GraduationCap,
  Handshake,
  Inbox,
  KanbanSquare,
  LayoutDashboard,
  Layers,
  LifeBuoy,
  ListChecks,
  Mail,
  Megaphone,
  MessagesSquare,
  PieChart,
  Radar,
  Rocket,
  ListTodo,
  Paintbrush,
  Palette,
  Search,
  Settings,
  Shield,
  Store,
  Target,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { Permission } from "@/lib/constants/permissions";

/**
 * Internal agency navigation.
 * Consumed by `AppSidebar`, `CommandPalette`, and the mobile nav.
 * Every item declares which permission is required to see it.
 */

export type AppNavItem = {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  badge?: "leads" | "approvals" | "notifications" | "tasks" | "messages" | null;
  permission?: Permission;
  exact?: boolean;
  external?: boolean;
  disabled?: boolean;
  children?: AppNavItem[];
};

export type AppNavSection = {
  id: string;
  label?: string;
  items: AppNavItem[];
};

export const appNavSections: AppNavSection[] = [
  {
    id: "platform",
    label: "Platform",
    items: [
      {
        id: "platform",
        label: "Super Admin",
        href: "/platform",
        icon: Shield,
        children: [
          {
            id: "platform-workspaces",
            label: "Workspaces",
            href: "/platform/workspaces",
            icon: Building2,
          },
          {
            id: "platform-users",
            label: "Users",
            href: "/platform/users",
            icon: Users,
          },
          {
            id: "platform-health",
            label: "System health",
            href: "/platform/health",
            icon: Activity,
          },
          {
            id: "platform-audit",
            label: "Audit trail",
            href: "/platform/audit",
            icon: ClipboardCheck,
          },
        ],
      },
    ],
  },
  {
    id: "primary",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        id: "executive-brief",
        label: "Executive Brief",
        href: "/dashboard/executive-brief",
        icon: FileText,
      },
    ],
  },
  {
    id: "clients",
    label: "Clients",
    items: [
      {
        id: "clients-list",
        label: "All Clients",
        href: "/clients",
        icon: Building2,
      },
      {
        id: "portfolio",
        label: "Portfolio Health",
        href: "/portfolio",
        icon: PieChart,
      },
      {
        id: "portfolio-expansion",
        label: "Expansion",
        href: "/portfolio/expansion",
        icon: TrendingUp,
      },
    ],
  },
  {
    id: "sales",
    label: "Sales & CRM",
    items: [
      {
        id: "crm",
        label: "CRM",
        href: "/crm",
        icon: Handshake,
        children: [
          {
            id: "leads",
            label: "Leads",
            href: "/crm/leads",
            icon: Users,
            badge: "leads",
          },
          {
            id: "pipeline",
            label: "Pipeline",
            href: "/crm/pipeline",
            icon: KanbanSquare,
          },
          {
            id: "opportunities",
            label: "Opportunities",
            href: "/crm/opportunities",
            icon: Target,
          },
          {
            id: "contacts",
            label: "Contacts",
            href: "/crm/contacts",
            icon: UserCog,
          },
          {
            id: "companies",
            label: "Companies",
            href: "/crm/companies",
            icon: Building2,
          },
          {
            id: "activities",
            label: "Activities",
            href: "/crm/activities",
            icon: Activity,
          },
          {
            id: "follow-ups",
            label: "Follow-Ups",
            href: "/crm/follow-ups",
            icon: ListChecks,
          },
          {
            id: "scoring",
            label: "Lead Scoring",
            href: "/crm/scoring",
            icon: Target,
          },
          {
            id: "sources",
            label: "Sources",
            href: "/crm/sources",
            icon: Radar,
          },
        ],
      },
      {
        id: "sales-workspace",
        label: "Sales",
        href: "/sales",
        icon: Briefcase,
        children: [
          {
            id: "proposals",
            label: "Proposals",
            href: "/sales/proposals",
            icon: FileText,
          },
          {
            id: "contracts",
            label: "Contracts",
            href: "/sales/contracts",
            icon: FileText,
          },
          { id: "deals", label: "Deals", href: "/sales/deals", icon: Handshake },
          {
            id: "documents",
            label: "Documents",
            href: "/sales/documents",
            icon: FileText,
          },
        ],
      },
      {
        id: "growth-assessment",
        label: "Growth Assessment",
        href: "/growth-assessment/submissions",
        icon: GraduationCap,
      },
    ],
  },
  {
    id: "delivery",
    label: "Delivery",
    items: [
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: Layers,
        children: [
          {
            id: "projects-board",
            label: "Board",
            href: "/projects/board",
            icon: KanbanSquare,
          },
          {
            id: "projects-timeline",
            label: "Timeline",
            href: "/projects/timeline",
            icon: Calendar,
          },
          {
            id: "milestones",
            label: "Milestones",
            href: "/projects/milestones",
            icon: Target,
          },
          {
            id: "deliverables",
            label: "Deliverables",
            href: "/projects/deliverables",
            icon: CheckSquare,
          },
        ],
      },
      {
        id: "tasks",
        label: "Tasks",
        href: "/tasks",
        icon: CheckSquare,
        badge: "tasks",
        children: [
          {
            id: "my-tasks",
            label: "My Tasks",
            href: "/tasks/my-tasks",
            icon: CheckSquare,
          },
          { id: "tasks-board", label: "Board", href: "/tasks/board", icon: KanbanSquare },
        ],
      },
      {
        id: "approvals",
        label: "Approvals",
        href: "/approvals",
        icon: ClipboardCheck,
        badge: "approvals",
        children: [
          {
            id: "approvals-pending",
            label: "Pending",
            href: "/approvals/pending",
            icon: AlertTriangle,
          },
          {
            id: "approvals-history",
            label: "History",
            href: "/approvals/history",
            icon: Activity,
          },
        ],
      },
      {
        id: "campaigns",
        label: "Campaigns",
        href: "/campaigns",
        icon: Megaphone,
        children: [
          {
            id: "campaigns-calendar",
            label: "Calendar",
            href: "/campaigns/calendar",
            icon: Calendar,
          },
          {
            id: "campaigns-channels",
            label: "Channels",
            href: "/campaigns/channels",
            icon: Store,
          },
          {
            id: "campaigns-attribution",
            label: "Attribution",
            href: "/campaigns/attribution",
            icon: Radar,
          },
        ],
      },
      {
        id: "content",
        label: "Content",
        href: "/content",
        icon: FileText,
        children: [
          {
            id: "content-calendar",
            label: "Calendar",
            href: "/content/calendar",
            icon: Calendar,
          },
          {
            id: "content-pipeline",
            label: "Pipeline",
            href: "/content/pipeline",
            icon: KanbanSquare,
          },
          {
            id: "content-library",
            label: "Library",
            href: "/content/library",
            icon: BookOpen,
          },
        ],
      },
      {
        id: "brand",
        label: "Brand",
        href: "/brand",
        icon: Palette,
        children: [
          { id: "brand-assets", label: "Assets", href: "/brand/assets", icon: Layers },
          {
            id: "brand-guidelines",
            label: "Guidelines",
            href: "/brand/guidelines",
            icon: BookOpen,
          },
        ],
      },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    items: [
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
        children: [
          {
            id: "analytics-visits",
            label: "Visitor places",
            href: "/visits",
            icon: Activity,
          },
          {
            id: "analytics-sheet-downloads",
            label: "Growth sheet leads",
            href: "/sheet-downloads",
            icon: FileText,
          },
          {
            id: "analytics-events",
            label: "Events",
            href: "/analytics/events",
            icon: Activity,
          },
          {
            id: "analytics-utm",
            label: "UTM Builder",
            href: "/analytics/utm-builder",
            icon: Target,
          },
          {
            id: "analytics-sources",
            label: "Data Sources",
            href: "/analytics/data-sources",
            icon: Layers,
          },
          {
            id: "analytics-warehouse",
            label: "Warehouse",
            href: "/analytics/warehouse",
            icon: Store,
          },
          {
            id: "analytics-explorer",
            label: "Explorer",
            href: "/analytics/explorer",
            icon: Search,
          },
        ],
      },
      {
        id: "intelligence-hub",
        label: "Intelligence",
        href: "/intelligence",
        icon: Brain,
        children: [
          {
            id: "anomalies",
            label: "Anomalies",
            href: "/intelligence/anomalies",
            icon: AlertTriangle,
          },
          {
            id: "bottlenecks",
            label: "Bottlenecks",
            href: "/intelligence/bottlenecks",
            icon: Target,
          },
          {
            id: "why-did",
            label: "Why Did...",
            href: "/intelligence/why-did",
            icon: Search,
          },
          {
            id: "next-actions",
            label: "Next Best Actions",
            href: "/intelligence/next-best-actions",
            icon: ListTodo,
          },
          {
            id: "experiments",
            label: "Experiments",
            href: "/intelligence/experiments",
            icon: Rocket,
          },
          {
            id: "autopilot",
            label: "Autopilot",
            href: "/intelligence/autopilot",
            icon: Zap,
          },
        ],
      },
      {
        id: "automation",
        label: "Automation",
        href: "/automation",
        icon: Workflow,
        children: [
          {
            id: "workflows",
            label: "Workflows",
            href: "/automation/workflows",
            icon: Workflow,
          },
          { id: "triggers", label: "Triggers", href: "/automation/triggers", icon: Zap },
          { id: "runs", label: "Runs", href: "/automation/runs", icon: Activity },
        ],
      },
      {
        id: "ai",
        label: "AI Assistants",
        href: "/ai",
        icon: Bot,
        children: [
          { id: "ai-research", label: "Research", href: "/ai/research", icon: Search },
          { id: "ai-strategy", label: "Strategy", href: "/ai/strategy", icon: Target },
          {
            id: "ai-reporting",
            label: "Reporting",
            href: "/ai/reporting",
            icon: FileBarChart,
          },
          { id: "ai-content", label: "Content", href: "/ai/content", icon: FileText },
          { id: "ai-sales", label: "Sales", href: "/ai/sales", icon: Handshake },
        ],
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    items: [
      {
        id: "reports",
        label: "Reports",
        href: "/reports",
        icon: FileBarChart,
        children: [
          {
            id: "reports-templates",
            label: "Templates",
            href: "/reports/templates",
            icon: FileText,
          },
          {
            id: "reports-scheduled",
            label: "Scheduled",
            href: "/reports/scheduled",
            icon: Calendar,
          },
        ],
      },
      {
        id: "finance",
        label: "Finance",
        href: "/finance",
        icon: Wallet,
        children: [
          {
            id: "finance-invoices",
            label: "Invoices",
            href: "/finance/invoices",
            icon: FileText,
          },
          {
            id: "finance-payments",
            label: "Payments",
            href: "/finance/payments",
            icon: Wallet,
          },
          {
            id: "finance-subscriptions",
            label: "Subscriptions",
            href: "/finance/subscriptions",
            icon: Calendar,
          },
          {
            id: "finance-expenses",
            label: "Expenses",
            href: "/finance/expenses",
            icon: Wallet,
          },
          {
            id: "finance-profitability",
            label: "Profitability",
            href: "/finance/profitability",
            icon: PieChart,
          },
          {
            id: "finance-reports",
            label: "Reports",
            href: "/finance/reports",
            icon: FileBarChart,
          },
        ],
      },
      {
        id: "team",
        label: "Team",
        href: "/team",
        icon: Users,
        children: [
          { id: "team-members", label: "Members", href: "/team/members", icon: Users },
          { id: "team-roles", label: "Roles", href: "/team/roles", icon: Shield },
          { id: "team-capacity", label: "Capacity", href: "/team/capacity", icon: Gauge },
          {
            id: "team-timesheets",
            label: "Timesheets",
            href: "/team/timesheets",
            icon: Calendar,
          },
        ],
      },
      {
        id: "services",
        label: "Services",
        href: "/services",
        icon: Store,
        children: [
          {
            id: "services-packages",
            label: "Packages",
            href: "/services/packages",
            icon: Layers,
          },
          {
            id: "services-engagements",
            label: "Engagements",
            href: "/services/engagements",
            icon: Handshake,
          },
          {
            id: "services-pricing",
            label: "Pricing",
            href: "/services/pricing",
            icon: Wallet,
          },
        ],
      },
      {
        id: "knowledge",
        label: "Knowledge",
        href: "/knowledge",
        icon: BookOpen,
        children: [
          {
            id: "knowledge-sops",
            label: "SOPs",
            href: "/knowledge/sops",
            icon: ListChecks,
          },
          {
            id: "knowledge-playbooks",
            label: "Playbooks",
            href: "/knowledge/playbooks",
            icon: Rocket,
          },
          {
            id: "knowledge-templates",
            label: "Templates",
            href: "/knowledge/templates",
            icon: FileText,
          },
          {
            id: "knowledge-frameworks",
            label: "Frameworks",
            href: "/knowledge/frameworks",
            icon: Layers,
          },
          {
            id: "knowledge-search",
            label: "Search",
            href: "/knowledge/search",
            icon: Search,
          },
        ],
      },
      {
        id: "messaging",
        label: "Messaging",
        href: "/messaging",
        icon: MessagesSquare,
        badge: "messages",
        children: [
          { id: "inbox", label: "Inbox", href: "/messaging/inbox", icon: Inbox },
          {
            id: "channels",
            label: "Channels",
            href: "/messaging/channels",
            icon: MessagesSquare,
          },
          {
            id: "whatsapp",
            label: "WhatsApp",
            href: "/messaging/whatsapp",
            icon: MessagesSquare,
          },
        ],
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
        badge: "notifications",
      },
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: Settings,
        children: [
          {
            id: "settings-profile",
            label: "Profile",
            href: "/settings/profile",
            icon: UserCog,
          },
          {
            id: "settings-org",
            label: "Organization",
            href: "/settings/organization",
            icon: Building2,
          },
          {
            id: "settings-branding",
            label: "Branding",
            href: "/settings/branding",
            icon: Paintbrush,
          },
          { id: "settings-roles", label: "Roles", href: "/settings/roles", icon: Shield },
          {
            id: "settings-permissions",
            label: "Permissions",
            href: "/settings/permissions",
            icon: Shield,
          },
          {
            id: "settings-integrations",
            label: "Integrations",
            href: "/settings/integrations",
            icon: Layers,
          },
          {
            id: "settings-api-keys",
            label: "API Keys",
            href: "/settings/api-keys",
            icon: Cog,
          },
          {
            id: "settings-webhooks",
            label: "Webhooks",
            href: "/settings/webhooks",
            icon: Zap,
          },
          {
            id: "settings-notifications",
            label: "Notifications",
            href: "/settings/notifications",
            icon: Bell,
          },
          {
            id: "settings-billing",
            label: "Billing",
            href: "/settings/billing",
            icon: Wallet,
          },
          {
            id: "settings-security",
            label: "Security",
            href: "/settings/security",
            icon: Shield,
          },
          {
            id: "settings-audit",
            label: "Audit Logs",
            href: "/settings/audit-logs",
            icon: Activity,
          },
        ],
      },
      {
        id: "help",
        label: "Help & Support",
        href: "/help",
        icon: LifeBuoy,
      },
    ],
  },
];

/**
 * Flattens the tree into a list for command palette and search.
 */
export function flattenAppNav(sections: AppNavSection[] = appNavSections): AppNavItem[] {
  const out: AppNavItem[] = [];

  function walk(items: AppNavItem[]) {
    for (const item of items) {
      out.push(item);

      if (item.children) walk(item.children);
    }
  }

  sections.forEach((section) => walk(section.items));

  return out;
}

export const flatAppNavItems: AppNavItem[] = flattenAppNav();

export const ChevronRightIcon = ChevronRight;
