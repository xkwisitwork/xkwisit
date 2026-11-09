export type Division = {
  id: string;
  index: string;
  title: string;
  outcome: string;
  stake: string;
  services: string[];
  href: string;
};

export const divisions: Division[] = [
  {
    id: "technology",
    index: "01",
    title: "Website, apps & payments",
    outcome:
      "We build the place customers finish buying - website, mobile app, checkout, and payments that work on a Nigerian phone connection. No more “message us on WhatsApp to pay.”",
    stake: "If they cannot pay you online, the sale dies in the cart.",
    services: [
      "Websites that sell",
      "Mobile apps",
      "Online payments",
      "Product & UX design",
      "Rebuild old systems",
      "Marketplaces",
      "Booking systems",
      "APIs & backends",
    ],
    href: "/services/web-development",
  },
  {
    id: "growth",
    index: "02",
    title: "Getting customers & closing sales",
    outcome:
      "We bring in the right people - then make sure someone answers, follows up, and closes. Ads, search, social, content, and the reply system after the click.",
    stake: "Paying for clicks without a closing path is burning money.",
    services: [
      "Ads that match the offer",
      "Search & local SEO",
      "Social content",
      "Email & WhatsApp follow-up",
      "Lead capture",
      "Landing pages",
      "Sales follow-up rhythm",
      "Campaign reporting",
    ],
    href: "/services/business-growth",
  },
  {
    id: "brand",
    index: "03",
    title: "Brand that makes the offer clear",
    outcome:
      "Name, look, story, and design that tell people what you sell and why they should choose you - so marketing and sales say the same thing.",
    stake: "Looking expensive is useless if nobody knows what to buy.",
    services: [
      "Brand strategy",
      "Logo & identity",
      "Offer messaging",
      "Packaging",
      "Social creatives",
      "Print & flyers",
      "Pitch decks",
      "Motion & video look",
    ],
    href: "/services/branding",
  },
  {
    id: "ai",
    index: "04",
    title: "AI tools your team will actually use",
    outcome:
      "Faster content, replies, and busywork - set up so your people open them on Monday. Human-checked, not left on autopilot to embarrass the brand.",
    stake: "An AI tool nobody opens is just another monthly bill.",
    services: [
      "AI for content",
      "Reply assistants",
      "Workflow automation",
      "Voice & video tools",
      "Content calendars",
      "Internal AI playbooks",
      "Team training",
      "Safe rollout",
    ],
    href: "/services/consulting",
  },
  {
    id: "intelligence",
    index: "05",
    title: "Numbers you can decide with",
    outcome:
      "Simple scores for money in, leads in, and sales out. You see what is working, what is wasting spend, and what to fix before the next budget.",
    stake: "If you cannot see what came back as profit, next month’s spend is a guess.",
    services: [
      "Sales dashboards",
      "Ad & channel reports",
      "Lead tracking",
      "Weekly scoreboards",
      "Profit vs spend view",
      "Customer insights",
      "Performance reviews",
      "Clear Monday numbers",
    ],
    href: "/services/profit-optimization",
  },
];
