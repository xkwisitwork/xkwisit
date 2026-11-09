import type { Metadata } from "next";

import { BusinessXrayClient } from "@/features/assessment";

export const metadata: Metadata = {
  title: "Business X-Ray",
  description:
    "Paste your website. Xkwisit reads the public site and shows the first opportunities.",
};

export default function BusinessXrayPage() {
  return <BusinessXrayClient />;
}
