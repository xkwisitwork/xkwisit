/**
 * Public marketing team roster.
 * Swap names/photos when real people are cleared for the site.
 */

export type TeamMember = {
  id: string;
  index: string;
  name: string;
  role: string;
  focus: string;
  opinion: string;
  does: string;
  tags: [string, string];
  image: string;
  imageAlt: string;
  objectPosition: string;
  href: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "marketing",
    index: "01",
    name: "Adaeze Okonkwo",
    role: "Head of Marketing",
    focus: "Customers, ads, and follow-up",
    opinion:
      "More ads are not a strategy. I look at where people drop off after the click - the page, the WhatsApp reply, the offer - then I fix that before we spend another naira.",
    does: "Runs paid ads, search, content, and lead follow-up so interest turns into real enquiries and sales you can count.",
    tags: ["Ads", "Follow-up"],
    image: "/images/people/method-owner.jpg",
    imageAlt: "Head of Marketing",
    objectPosition: "center 16%",
    href: "/services/business-growth",
  },
  {
    id: "applications",
    index: "02",
    name: "uncle TOBE",
    role: "Lead Software Engineer",
    focus: "Websites, apps, and payments",
    opinion:
      "A write-up or pitch deck cannot take a customer’s money. A website or mobile app can. I build the product that lets people browse, buy, and pay - so your business can sell while you sleep.",
    does: "Builds websites and mobile apps with real payments - not slides or documents - so customers can finish buying inside your business.",
    tags: ["Websites", "Payments"],
    image: "/images/people/tobe.jpg",
    imageAlt: "Lead Software Engineer, uncle TOBE",
    objectPosition: "center top",
    href: "/services/web-development",
  },
  {
    id: "brand",
    index: "03",
    name: "Ngozi Adeyemi",
    role: "Head of Brand",
    focus: "Look, story, and clear offer",
    opinion:
      "People can like how you look and still not buy. My job is to make the story and the offer so clear that a stranger knows what you sell - and why they should choose you.",
    does: "Owns brand identity, guidelines, packaging, and creative so every ad and sales message says the same thing.",
    tags: ["Identity", "Offer"],
    image: "/images/people/founder-smile.jpg",
    imageAlt: "Head of Brand",
    objectPosition: "center 22%",
    href: "/services/branding",
  },
  {
    id: "numbers",
    index: "04",
    name: "Tunde Balogun",
    role: "Head of Growth Intelligence",
    focus: "Numbers that owners can read",
    opinion:
      "If you cannot see what came back as a sale, the next budget is a guess. I turn spend, leads, and sales into a short Monday read - not a dashboard nobody opens.",
    does: "Tracks money in, leads in, and sales out. Flags what is working, what is stuck, and what to fix next.",
    tags: ["Reports", "Sales"],
    image: "/images/people/shop-owner.jpg",
    imageAlt: "Head of Growth Intelligence",
    objectPosition: "center 16%",
    href: "/services/profit-optimization",
  },
];
