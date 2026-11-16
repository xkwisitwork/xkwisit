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
    id: "ceo",
    index: "01",
    name: "Mr. Bishop",
    role: "CEO",
    focus: "Analyst & business engineer",
    opinion:
      "It's not enough for people to know your business exists. They need to feel why it matters, trust what you offer, and see why choosing anyone else would be a mistake.",
    does: "Reads the business like a system — finds the real constraint, designs the operating model, and keeps every function pointed at profitable growth.",
    tags: ["Strategy", "Systems"],
    image: "/images/people/founder-smile.jpg",
    imageAlt: "Mr. Bishop, CEO — analyst and business engineer",
    objectPosition: "center 22%",
    href: "/about",
  },
  {
    id: "cto",
    index: "02",
    name: "Mr. Daniel",
    role: "CTO",
    focus: "Marketing genius",
    opinion:
      "If you cannot see what came back as a sale, the next budget is a guess. I turn spend, leads, and sales into a short Monday read — not a dashboard nobody opens.",
    does: "Bridges product and acquisition — the rare CTO who also thinks like a marketer, so tech ships with a path to demand, not just a launch.",
    tags: ["Product", "Growth"],
    image: "/images/people/shop-owner.jpg",
    imageAlt: "Mr. Daniel, CTO — marketing genius",
    objectPosition: "center 16%",
    href: "/services/business-growth",
  },
  {
    id: "applications",
    index: "03",
    name: "Tobe",
    role: "Lead Software Engineer",
    focus: "Websites, apps, and payments",
    opinion:
      "Your business shouldn't run on manual processes. I build web and mobile apps that turn how you operate into digital systems — so you can serve customers, process payments, and scale without adding complexity.",
    does: "Builds the product customers can actually use and pay through — websites, mobile apps, and payment flows that keep selling when you’re offline.",
    tags: ["Websites", "Payments"],
    image: "/images/people/tobe.jpg",
    imageAlt: "Tobe, Lead Software Engineer",
    objectPosition: "center top",
    href: "/services/web-development",
  },
];
