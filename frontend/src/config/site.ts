/**
 * Site-wide configuration for Xkwisit.
 * Single source of truth for name, tagline, URL, navigation labels,
 * social links, and legal references used across marketing pages.
 */

export type SiteConfig = {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  motto: string;
  slogan: string;
  description: string;
  url: string;
  keywords: string[];
  locale: string;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
    };
  };
  social: {
    twitter: string;
    linkedin: string;
    instagram: string;
    facebook: string;
    youtube: string;
  };
  legal: {
    privacyUpdated: string;
    termsUpdated: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Xkwisit",
  shortName: "Xkwisit",
  legalName: "Xkwisit Services International",
  tagline: "Crafting Your Vision. Fueling Your Success.",
  motto: "Crafting Your Vision. Fueling Your Success.",
  slogan: "Promoting business through optimum and fast delivery globally.",
  description:
    "Xkwisit finds why sales are stuck - brand, website, ads, or follow-up - then fixes that. Free checks for business owners. A private login so you see the work. Our team runs the same system.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://xkwisit.com",
  keywords: [
    "marketing agency",
    "branding agency",
    "business growth",
    "sales optimization",
    "digital marketing",
    "SEO",
    "paid advertising",
    "content marketing",
    "CRM automation",
    "growth consulting",
    "Nigeria marketing agency",
    "Xkwisit",
  ],
  locale: "en_NG",
  contact: {
    email: "hello@xkwisit.com",
    phone: "+234 800 000 0000",
    whatsapp: "+234 800 000 0000",
    address: {
      street: "1 Example Street",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },
  },
  social: {
    twitter: "https://twitter.com/xkwisit",
    linkedin: "https://linkedin.com/company/xkwisit",
    instagram: "https://instagram.com/xkwisit",
    facebook: "https://facebook.com/xkwisit",
    youtube: "https://youtube.com/@xkwisit",
  },
  legal: {
    privacyUpdated: "2025-01-01",
    termsUpdated: "2025-01-01",
  },
};

/* ─── Derived exports ──────────────────────────────────── */

export const siteNav = {
  marketing: [
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Branding", href: "/services/branding" },
        { label: "Business Growth", href: "/services/business-growth" },
        { label: "Profit Optimization", href: "/services/profit-optimization" },
        { label: "Web Development", href: "/services/web-development" },
        { label: "SEO", href: "/services/seo" },
        { label: "Paid Media", href: "/services/paid-media" },
        { label: "Content", href: "/services/content" },
        { label: "CRM & Automation", href: "/services/crm-automation" },
        { label: "Consulting", href: "/services/consulting" },
      ],
    },
    {
      label: "Solutions",
      href: "/solutions",
      children: [
        { label: "E-commerce", href: "/solutions/ecommerce" },
        { label: "Real Estate", href: "/solutions/real-estate" },
        { label: "Healthcare", href: "/solutions/healthcare" },
        { label: "Education", href: "/solutions/education" },
        { label: "Fintech", href: "/solutions/fintech" },
        { label: "Hospitality", href: "/solutions/hospitality" },
      ],
    },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
  footer: {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about/team" },
      { label: "Mission", href: "/about/mission" },
      { label: "Careers", href: "/about/careers" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Insights", href: "/insights" },
      { label: "Playbooks", href: "/resources/playbooks" },
      { label: "Templates", href: "/resources/templates" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Growth Assessment", href: "/growth-assessment" },
      { label: "Business X-Ray", href: "/business-x-ray" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "DPA", href: "/legal/dpa" },
    ],
  },
} as const;

/* ─── Route constants ──────────────────────────────────── */

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  caseStudies: "/case-studies",
  insights: "/insights",
  pricing: "/pricing",
  contact: "/contact",
  book: "/book",
  growthAssessment: "/growth-assessment",
  businessXray: "/business-x-ray",

  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",

  dashboard: "/dashboard",
  clients: "/clients",
  crm: "/crm",
  sales: "/sales",
  projects: "/projects",
  tasks: "/tasks",
  approvals: "/approvals",
  campaigns: "/campaigns",
  content: "/content",
  brand: "/brand",
  analytics: "/analytics",
  intelligence: "/intelligence",
  automation: "/automation",
  reports: "/reports",
  finance: "/finance",
  team: "/team",
  knowledge: "/knowledge",
  messaging: "/messaging",
  ai: "/ai",
  settings: "/settings",

  portalHome: "/home",
  portalPerformance: "/performance",
  portalApprovals: "/portal/approvals",
  portalReports: "/portal/reports",
  portalBrand: "/portal/brand",
  portalBrandAssets: "/portal/brand/assets",
  portalInvoices: "/invoices",
  portalMessages: "/messages",
  portalSettings: "/portal/settings",
} as const;
