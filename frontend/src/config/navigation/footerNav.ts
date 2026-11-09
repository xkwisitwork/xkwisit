import type { NavItem } from "./marketingNav";

/**
 * Footer navigation aggregation.
 * The marketing footer consumes these groups directly.
 */

export type FooterColumn = {
  id: string;
  title: string;
  items: NavItem[];
};

export type FooterSocialLink = {
  id: string;
  label: string;
  href: string;
};

export const footerColumns: FooterColumn[] = [
  {
    id: "services",
    title: "Services",
    items: [
      { label: "Branding", href: "/services/branding" },
      { label: "Business Growth", href: "/services/business-growth" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "SEO", href: "/services/seo" },
      { label: "Paid Media", href: "/services/paid-media" },
      { label: "Content", href: "/services/content" },
      { label: "CRM & Automation", href: "/services/crm-automation" },
      { label: "Profit Optimization", href: "/services/profit-optimization" },
    ],
  },
  {
    id: "solutions",
    title: "Solutions",
    items: [
      { label: "E-commerce", href: "/solutions/ecommerce" },
      { label: "Real Estate", href: "/solutions/real-estate" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Education", href: "/solutions/education" },
      { label: "Fintech", href: "/solutions/fintech" },
      { label: "Hospitality", href: "/solutions/hospitality" },
    ],
  },
  {
    id: "company",
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about/team" },
      { label: "Mission", href: "/about/mission" },
      { label: "Careers", href: "/about/careers" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    items: [
      { label: "Growth Assessment", href: "/growth-assessment" },
      { label: "Business X-Ray", href: "/business-x-ray" },
      { label: "Playbooks", href: "/resources/playbooks" },
      { label: "Templates", href: "/resources/templates" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
];

export const footerSocialLinks: FooterSocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/xkwisit" },
  { id: "twitter", label: "X (Twitter)", href: "https://twitter.com/xkwisit" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/xkwisit" },
  { id: "facebook", label: "Facebook", href: "https://facebook.com/xkwisit" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com/@xkwisit" },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "DPA", href: "/legal/dpa" },
];

export const footerCtaCards: Array<{
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}> = [
  {
    id: "assessment",
    eyebrow: "Free diagnostic",
    title: "Get Your Growth Assessment",
    description:
      "Answer 30 questions and receive a full diagnostic of your business - the same framework we use with clients.",
    href: "/growth-assessment",
    cta: "Start now",
  },
  {
    id: "xray",
    eyebrow: "Instant audit",
    title: "Run a Business X-Ray",
    description:
      "Enter your domain and get an instant read on your digital presence, SEO, reputation, and conversion setup.",
    href: "/business-x-ray",
    cta: "Try it free",
  },
];
