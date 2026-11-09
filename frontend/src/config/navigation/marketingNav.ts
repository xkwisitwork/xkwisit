import {
  BarChart3,
  Building2,
  FileText,
  HelpCircle,
  Home,
  Layers,
  LifeBuoy,
  Megaphone,
  MessageSquare,
  Palette,
  PenTool,
  PieChart,
  Rocket,
  ScanSearch,
  Search,
  ShoppingBag,
  Store,
  TrendingUp,
  Users,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Marketing site navigation.
 * Used by `MarketingHeader` (top nav) and `MarketingFooter` (footer columns).
 */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  disabled?: boolean;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  href?: string;
  items: NavItem[];
};

/* ─── Primary top navigation ─────────────────────── */

export const marketingPrimaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

/* ─── Mega menu: Services ────────────────────────── */

export const servicesMegaMenu: NavGroup[] = [
  {
    label: "Branding & Positioning",
    items: [
      {
        label: "Branding",
        href: "/services/branding",
        icon: Palette,
        description: "Identity, logo, guidelines, and brand strategy.",
      },
      {
        label: "Content",
        href: "/services/content",
        icon: PenTool,
        description: "Editorial, social, video, and long-form content.",
      },
    ],
  },
  {
    label: "Growth & Acquisition",
    items: [
      {
        label: "Business Growth",
        href: "/services/business-growth",
        icon: TrendingUp,
        description: "Diagnose, prioritise, and unlock growth levers.",
      },
      {
        label: "Paid Media",
        href: "/services/paid-media",
        icon: Megaphone,
        description: "Google, Meta, LinkedIn, YouTube, X.",
      },
      {
        label: "SEO",
        href: "/services/seo",
        icon: Search,
        description: "Technical, content, authority, and local SEO.",
      },
      {
        label: "Web Development",
        href: "/services/web-development",
        icon: Layers,
        description: "Sites, mobile apps, portals, payments, and product analytics.",
      },
    ],
  },
  {
    label: "Operations & Profit",
    items: [
      {
        label: "CRM & Automation",
        href: "/services/crm-automation",
        icon: Workflow,
        description: "Pipelines, workflows, lifecycle automation.",
      },
      {
        label: "Profit Optimization",
        href: "/services/profit-optimization",
        icon: PieChart,
        description: "Margin analysis, ops efficiency, and reporting.",
      },
      {
        label: "Consulting",
        href: "/services/consulting",
        icon: MessageSquare,
        description: "Fractional CMO and growth advisory engagements.",
      },
    ],
  },
];

/* ─── Mega menu: Solutions (bento by industry) ───── */

export const solutionsMegaMenu: NavGroup[] = [
  {
    label: "Sell & book",
    items: [
      {
        label: "E-commerce",
        href: "/solutions/ecommerce",
        icon: ShoppingBag,
        description: "Acquisition, retention, and AOV growth.",
      },
      {
        label: "Real Estate",
        href: "/solutions/real-estate",
        icon: Building2,
        description: "Lead gen, nurture, and site visit booking.",
      },
      {
        label: "Hospitality",
        href: "/solutions/hospitality",
        icon: Store,
        description: "Direct bookings and reputation management.",
      },
    ],
  },
  {
    label: "Care & learn",
    items: [
      {
        label: "Healthcare",
        href: "/solutions/healthcare",
        icon: LifeBuoy,
        description: "Compliance-aware patient acquisition.",
      },
      {
        label: "Education",
        href: "/solutions/education",
        icon: FileText,
        description: "Enrolment funnels and admissions automation.",
      },
    ],
  },
  {
    label: "Money",
    items: [
      {
        label: "Fintech",
        href: "/solutions/fintech",
        icon: Wallet,
        description: "Onboarding, activation, and lifecycle marketing.",
      },
    ],
  },
];

/* ─── Mega menu: Case Studies ────────────────────── */

export const caseStudiesMegaMenu: NavGroup[] = [
  {
    label: "Browse",
    items: [
      {
        label: "All Case Studies",
        href: "/case-studies",
        icon: FileText,
        description: "Every published engagement.",
      },
      {
        label: "Growth",
        href: "/case-studies?filter=growth",
        icon: TrendingUp,
        description: "Stories about money that came back.",
      },
      {
        label: "Branding",
        href: "/case-studies?filter=branding",
        icon: Palette,
        description: "Identity and positioning stories.",
      },
      {
        label: "Performance",
        href: "/case-studies?filter=performance",
        icon: BarChart3,
        description: "Paid media and CRO stories.",
      },
    ],
  },
];

/* ─── Footer columns ─────────────────────────────── */

export const footerCompanyNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about/team" },
  { label: "Mission", href: "/about/mission" },
  { label: "Careers", href: "/about/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerServicesNav: NavItem[] = [
  { label: "Branding", href: "/services/branding" },
  { label: "Business Growth", href: "/services/business-growth" },
  { label: "Paid Media", href: "/services/paid-media" },
  { label: "SEO", href: "/services/seo" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "CRM & Automation", href: "/services/crm-automation" },
];

export const footerResourcesNav: NavItem[] = [
  { label: "Insights", href: "/insights" },
  { label: "Playbooks", href: "/resources/playbooks" },
  { label: "Templates", href: "/resources/templates" },
  { label: "Guides", href: "/resources/guides" },
  { label: "Growth Assessment", href: "/growth-assessment" },
  { label: "Business X-Ray", href: "/business-x-ray" },
];

export const footerLegalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "DPA", href: "/legal/dpa" },
];

/* ─── Utility navigation ─────────────────────────── */

export const marketingUtilityNav: NavItem[] = [
  { label: "Login", href: "/login" },
  { label: "Book a Call", href: "/book" },
];

/* ─── Icon shortcuts ─────────────────────────────── */

export const marketingQuickActions: NavItem[] = [
  {
    label: "Get Your Free Growth Assessment",
    href: "/growth-assessment",
    icon: Rocket,
    description: "Answer a short set of questions and get a diagnostic.",
  },
  {
    label: "Run a Free Business X-Ray",
    href: "/business-x-ray",
    icon: ScanSearch,
    description: "Instant audit of your digital presence.",
  },
  {
    label: "Talk to a Strategist",
    href: "/book",
    icon: Users,
    description: "Book a 30-minute strategy call.",
  },
];
