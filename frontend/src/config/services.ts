import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Handshake,
  Layers,
  Megaphone,
  Palette,
  PenTool,
  PieChart,
  Search,
  TrendingUp,
} from "lucide-react";

/**
 * Service catalog data.
 * Single source of truth for the public services pages, the internal
 * service catalog, and any place that needs to enumerate what Xkwisit sells.
 */

export type ServiceCategory = "BRANDING" | "BUSINESS_GROWTH" | "PROFIT_OPTIMIZATION";

export type ServiceFitNote = {
  title: string;
  body: string;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
  outcomes: string[];
  idealFor: string[];
  goodFor: ServiceFitNote[];
  notFor: ServiceFitNote[];
  startingFrom: number;
  currency: "NGN" | "USD";
  popular?: boolean;
  order: number;
};

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  BRANDING: "Branding",
  BUSINESS_GROWTH: "Business Growth",
  PROFIT_OPTIMIZATION: "Profit Optimization",
};

export const services: Service[] = [
  /* ─── Branding ─────────────────────────────────────── */
  {
    id: "branding",
    slug: "branding",
    name: "Branding",
    category: "BRANDING",
    tagline: "Identity that earns trust before you say a word.",
    description:
      "We design and position brands that command premium pricing and shorten sales cycles. From logo and visual identity to brand guidelines and messaging, everything is built to be used, not just admired.",
    icon: Palette,
    deliverables: [
      "Brand strategy and positioning document",
      "Logo suite (primary, secondary, icon)",
      "Visual identity system (color, type, spacing)",
      "Brand guidelines document",
      "Messaging and voice framework",
      "Social and marketing asset templates",
    ],
    outcomes: [
      "Clearer positioning in a crowded market",
      "Higher perceived value and pricing power",
      "Faster sales cycles",
      "Consistent brand expression across channels",
    ],
    idealFor: ["Founders", "Marketing leads", "CEOs"],
    goodFor: [
      {
        title: "Companies entering a new market",
        body: "You need a position buyers recognise in week one—not a logo that only your team likes. Messaging, proof, and visual system have to travel with the offer.",
      },
      {
        title: "Companies rebranding after years",
        body: "The old look still works in the office. Outside, it underprices you. You need a clean break with guidelines the whole company can use on Monday.",
      },
      {
        title: "Companies scaling beyond founder-led sales",
        body: "The founder’s story no longer reaches every deal. Sales and marketing need a shared voice, decks, and assets that close without a charismatic founder in the room.",
      },
    ],
    notFor: [
      {
        title: "Pre-idea stage",
        body: "If the offer and buyer are still fuzzy, branding freezes noise. Diagnose the offer first, then lock identity.",
      },
      {
        title: "Companies that only need a logo file",
        body: "A mark without strategy, type, colour, and usage rules is decoration. We sell systems people can run—not a single SVG.",
      },
    ],
    startingFrom: 1200000,
    currency: "NGN",
    popular: true,
    order: 1,
  },
  {
    id: "content",
    slug: "content",
    name: "Content",
    category: "BRANDING",
    tagline: "Editorial, social, video, and long-form that moves revenue.",
    description:
      "We produce content designed to move a specific audience through a specific funnel stage. No filler. No generic thought-leadership. Every piece is briefed, tracked, and measured against business impact.",
    icon: PenTool,
    deliverables: [
      "Content strategy and calendar",
      "SEO-focused blog articles",
      "Social media content (static, carousel, video)",
      "Email newsletters and lifecycle emails",
      "Video scripts and production direction",
      "Repurposing pipeline across channels",
    ],
    outcomes: [
      "Consistent publishing cadence",
      "Organic traffic growth",
      "Higher engagement from qualified audiences",
      "Content that supports paid and sales motion",
    ],
    idealFor: ["Marketing leads", "Growth leads"],
    goodFor: [
      {
        title: "Companies with a clear ICP but no publishing habit",
        body: "You know who buys. You do not ship on a calendar. We install a brief → draft → publish loop tied to pipeline stages, not vanity posts.",
      },
      {
        title: "Teams drowning in ad-hoc requests",
        body: "Sales and founders ping for “a quick post.” Without a calendar and owners, content stays reactive. We lock a ritual the team can keep.",
      },
      {
        title: "Paid and sales need better fuel",
        body: "Ads and outreach are running on thin proof. You need pieces that move a stage—case proof, demos, nurture—not generic thought leadership.",
      },
    ],
    notFor: [
      {
        title: "Companies wanting volume without a strategy",
        body: "More posts will not fix an unclear offer. If the brief is “just keep posting,” we will push you back to positioning first.",
      },
    ],
    startingFrom: 600000,
    currency: "NGN",
    order: 2,
  },

  /* ─── Business Growth ──────────────────────────────── */
  {
    id: "business-growth",
    slug: "business-growth",
    name: "Business Growth",
    category: "BUSINESS_GROWTH",
    tagline: "Diagnose, prioritise, and unlock the growth levers that matter.",
    description:
      "We run a structured diagnosis of your business, identify where growth is leaking, and build a 90-day roadmap you can execute with or without us. This is strategy, not a slide deck.",
    icon: TrendingUp,
    deliverables: [
      "Full business diagnostic (7 dimensions)",
      "Funnel and revenue leak analysis",
      "Competitor and market analysis",
      "90-day growth roadmap",
      "KPI framework and tracking setup",
      "Weekly strategic review",
    ],
    outcomes: [
      "Clear understanding of where growth is blocked",
      "Prioritised plan with owners and deadlines",
      "Measurable KPIs to track against",
      "Reduced wasted spend on the wrong channels",
    ],
    idealFor: ["Founders", "COOs", "CEOs"],
    goodFor: [
      {
        title: "Companies with traction but plateauing growth",
        body: "Revenue exists. The next leap does not. You need a ranked list of leaks, owners, and a 90-day sequence—not another brainstorm workshop.",
      },
      {
        title: "Leadership argues about where to spend",
        body: "Brand, ads, product, and sales each claim the bottleneck. A structured diagnosis puts one Monday number and one owner on the stuck part.",
      },
      {
        title: "You have motion without a scoreboard",
        body: "Activity is high. Clarity is low. We install KPIs and a weekly review so keep/cut/rename decisions stop living in chat threads.",
      },
    ],
    notFor: [
      {
        title: "Pre-revenue startups that need to find PMF first",
        body: "Without paying customers, growth plans are fiction. Prove the offer, then we design the system that scales it.",
      },
    ],
    startingFrom: 2400000,
    currency: "NGN",
    popular: true,
    order: 3,
  },
  {
    id: "web-development",
    slug: "web-development",
    name: "Web Development",
    category: "BUSINESS_GROWTH",
    tagline:
      "Websites, mobile apps, and product surfaces built to convert—not just look finished.",
    description:
      "We design and ship the technology customers use to discover, buy, and come back: marketing sites and landing pages, customer portals, and mobile apps—with payments, analytics, and experimentation baked in from day one. The brief is always the same: a buy path that works on a real phone connection, not a deck that dies in Drive.",
    icon: Layers,
    deliverables: [
      "Product UX for web and mobile",
      "Marketing sites and conversion landing pages",
      "Mobile apps (iOS, Android, or cross-platform)",
      "Customer portals and web apps",
      "Payments, checkout, and third-party integrations",
      "CMS or admin so your team can ship without waiting",
      "Analytics, event tracking, and release hygiene",
      "Performance, accessibility, and device testing",
    ],
    outcomes: [
      "Higher conversion on web and in-app flows",
      "A buy path customers can finish on mobile",
      "Faster, stable product performance",
      "Full visibility into what users do—and what they drop",
      "Surfaces your team can update without an engineering bottleneck",
    ],
    idealFor: ["Founders", "Marketing leads", "Product leads", "CTOs"],
    goodFor: [
      {
        title: "Companies outgrowing their current site",
        body: "Pages fight the offer. Speed, tracking, and CMS are brittle. You need a conversion shell marketing can edit without waiting on engineering.",
      },
      {
        title: "The buy path needs a real product—not another brochure",
        body: "Customers should browse, book, or pay inside your business. We ship mobile apps, portals, and checkout that finish the job WhatsApp and PDFs cannot.",
      },
      {
        title: "Launching an offer without trustworthy product data",
        body: "Forms and installs fire into the void. Experiments are guesses. We instrument web and app events with the build so Monday numbers are real.",
      },
    ],
    notFor: [
      {
        title: "Companies needing a one-page template or logo-only ask",
        body: "If a theme, freelancer, or static mock is enough, buy that. We build systems—sites, apps, payments, and analytics—your team can run.",
      },
    ],
    startingFrom: 1500000,
    currency: "NGN",
    order: 4,
  },
  {
    id: "seo",
    slug: "seo",
    name: "SEO",
    category: "BUSINESS_GROWTH",
    tagline: "Technical, content, authority, and local - measured to revenue.",
    description:
      "Search is a compounding channel. We set it up properly - technical foundation, content strategy, authority building, and local visibility - and track every organic session through to revenue.",
    icon: Search,
    deliverables: [
      "Technical SEO audit and fixes",
      "Keyword research and content roadmap",
      "On-page optimisation",
      "Link acquisition strategy",
      "Local SEO and Google Business Profile",
      "Monthly reporting tied to leads and revenue",
    ],
    outcomes: [
      "Organic traffic growth",
      "Ranking improvements for commercial terms",
      "Attribution of organic to revenue",
      "Reduced reliance on paid acquisition",
    ],
    idealFor: ["Marketing leads", "Growth leads"],
    goodFor: [
      {
        title: "Companies with a defined ICP and product-market fit",
        body: "You know who converts. Search should compound that demand—technical health, commercial keywords, and reporting that lands on revenue, not vanity sessions.",
      },
      {
        title: "Content exists but does not rank or convert",
        body: "Blog volume without commercial intent wastes spend. We rebuild the roadmap around money terms and pages that can win.",
      },
      {
        title: "Paid acquisition is getting expensive",
        body: "You need a compounding channel under the ads. SEO is the long book—technical fixes, authority, and attribution to pipeline.",
      },
    ],
    notFor: [
      {
        title: "Companies wanting rankings within 30 days",
        body: "Durable search is a multi-quarter build. If you need leads this month, start with paid or conversion while SEO compounds underneath.",
      },
    ],
    startingFrom: 900000,
    currency: "NGN",
    order: 5,
  },
  {
    id: "paid-media",
    slug: "paid-media",
    name: "Paid Media",
    category: "BUSINESS_GROWTH",
    tagline: "Google, Meta, LinkedIn, YouTube, X - managed to ROAS.",
    description:
      "We run the ads with one job: turn spend into people ready to buy, and into revenue. We measure cost per lead, cost to acquire a customer, and return on ad spend, not impressions.",
    icon: Megaphone,
    deliverables: [
      "Channel strategy and budget allocation",
      "Campaign setup and audience architecture",
      "Creative strategy and production support",
      "Landing page coordination",
      "Conversion tracking and attribution",
      "Weekly optimisation and monthly reviews",
    ],
    outcomes: [
      "Predictable lead flow",
      "Lower cost per qualified lead",
      "Higher return on ad spend",
      "Clear attribution of paid to revenue",
    ],
    idealFor: ["Marketing leads", "Growth leads"],
    goodFor: [
      {
        title: "Companies with a proven offer and at least ₦500k/month media budget",
        body: "The offer converts offline or organically. You are ready to buy attention at volume and manage to CPL, CAC, and ROAS—not impressions.",
      },
      {
        title: "Creative and audiences are stale",
        body: "Same ads, rising costs. You need a testing system—audience architecture, creative cycles, and weekly cuts tied to qualified leads.",
      },
      {
        title: "Spend without a clear return story",
        body: "Finance asks what ads bought. You need attribution from click to revenue, not vanity dashboards full of impressions.",
      },
    ],
    notFor: [
      {
        title: "Companies without a landing page or tracking",
        body: "Spend without a destination and attribution is noise. Fix the page and events first, then we turn the budget on.",
      },
    ],
    startingFrom: 1000000,
    currency: "NGN",
    popular: true,
    order: 6,
  },
  {
    id: "crm-automation",
    slug: "crm-automation",
    name: "CRM & Automation",
    category: "BUSINESS_GROWTH",
    tagline: "Pipelines, workflows, and lifecycle automation that scale.",
    description:
      "We design and build the operational layer that turns leads into customers. CRM setup, pipeline design, automation, and integrations that remove manual work.",
    icon: Bot,
    deliverables: [
      "CRM selection or configuration",
      "Pipeline and stage design",
      "Lead capture and routing automation",
      "Email and WhatsApp lifecycle sequences",
      "Integrations with marketing and finance tools",
      "Team training and SOPs",
    ],
    outcomes: [
      "No leads lost to manual process",
      "Faster response time on inbound",
      "Higher conversion at every stage",
      "Complete visibility into pipeline",
    ],
    idealFor: ["Sales leads", "Operations leads", "Founders"],
    goodFor: [
      {
        title: "Companies with volume that manual tracking can't handle",
        body: "Leads arrive faster than spreadsheets. You need routing, stages, and lifecycle sequences so nothing dies in someone’s inbox.",
      },
      {
        title: "Follow-up depends on heroic reps",
        body: "When someone is out, the pipe stalls. Automation and clear stages keep response times short without babysitting every lead.",
      },
      {
        title: "Marketing and sales disagree on what a lead is",
        body: "Handoffs are messy. We define stages, ownership, and lifecycle messaging so both desks read the same board.",
      },
    ],
    notFor: [
      {
        title: "Companies with fewer than 20 leads per month",
        body: "Light volume does not justify a heavy CRM build. Tighten follow-up by hand first; automate when the pipe is busy.",
      },
    ],
    startingFrom: 700000,
    currency: "NGN",
    order: 7,
  },
  {
    id: "consulting",
    slug: "consulting",
    name: "Consulting",
    category: "BUSINESS_GROWTH",
    tagline: "Fractional CMO and growth advisory engagements.",
    description:
      "For teams that already have execution capacity but lack senior strategic direction. We embed as a fractional CMO or growth advisor and run strategy, reviews, and hiring support.",
    icon: Handshake,
    deliverables: [
      "Weekly strategy sessions",
      "Channel and budget allocation decisions",
      "Hiring and team design support",
      "Board-ready reporting",
      "Access to Xkwisit playbooks and frameworks",
    ],
    outcomes: [
      "Senior strategy without a full-time hire",
      "Better decisions on spend and hiring",
      "Cleaner reporting to the board",
      "Faster iteration on growth experiments",
    ],
    idealFor: ["Founders", "CEOs", "COOs"],
    goodFor: [
      {
        title: "Companies with in-house marketing but no senior lead",
        body: "The team can ship. Nobody owns the Monday number. You want fractional CMO judgement—budget, channel mix, hiring—without a full-time hire.",
      },
      {
        title: "Board reporting is a scramble",
        body: "Numbers live in five tools. We install a clean narrative and review rhythm so leadership sees progress without a fire drill.",
      },
      {
        title: "You are hiring or reshaping the growth team",
        body: "Roles are fuzzy. We help design seats, scorecards, and priorities so new hires land into a system—not chaos.",
      },
    ],
    notFor: [
      {
        title: "Companies looking for full execution outsourcing",
        body: "We advise and prioritise. If you need us to produce every asset, pick an execution block instead of consulting.",
      },
    ],
    startingFrom: 1800000,
    currency: "NGN",
    order: 8,
  },

  /* ─── Profit Optimization ──────────────────────────── */
  {
    id: "profit-optimization",
    slug: "profit-optimization",
    name: "Profit Optimization",
    category: "PROFIT_OPTIMIZATION",
    tagline: "Margin analysis, ops efficiency, and financial visibility.",
    description:
      "Growth without profit isn't growth. We analyse margins, unit economics, and operational costs, and redesign the parts of the business that bleed money.",
    icon: PieChart,
    deliverables: [
      "Unit economics analysis",
      "Contribution margin by product and channel",
      "Ops cost review",
      "Pricing strategy recommendations",
      "Reporting and dashboard setup",
      "Quarterly optimisation cycles",
    ],
    outcomes: [
      "Higher contribution margin",
      "Better pricing decisions",
      "Reduced waste in operations",
      "Clear financial visibility for leadership",
    ],
    idealFor: ["Founders", "CFOs", "COOs"],
    goodFor: [
      {
        title: "Companies growing revenue but not profit",
        body: "Top line moves. Cash and margin do not. You need unit economics, channel contribution, and a cut list leadership can run every quarter.",
      },
      {
        title: "Pricing is gut feel",
        body: "Discounts and packages leak margin. We pressure-test pricing against contribution so the floor is deliberate.",
      },
      {
        title: "Ops costs hide in the noise",
        body: "Nobody owns the bleed. A structured review surfaces waste, owners, and a quarterly optimisation cycle.",
      },
    ],
    notFor: [
      {
        title: "Companies pre-revenue",
        body: "No revenue means no margin story. Prove the offer and first sales, then we tighten profit.",
      },
    ],
    startingFrom: 1500000,
    currency: "NGN",
    order: 9,
  },
];

export const servicesByCategory: Record<ServiceCategory, Service[]> = {
  BRANDING: services.filter((s) => s.category === "BRANDING"),
  BUSINESS_GROWTH: services.filter((s) => s.category === "BUSINESS_GROWTH"),
  PROFIT_OPTIMIZATION: services.filter((s) => s.category === "PROFIT_OPTIMIZATION"),
};

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const popularServices: Service[] = services.filter((s) => s.popular);
