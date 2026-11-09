import type { Metadata } from "next";

import BookPageClient from "./BookPageClient";

export const metadata: Metadata = {
  title: "Book a strategy call",
  description:
    "Book 30 minutes with Xkwisit. Leave with a ranked growth constraint and a clear next move.",
};

export default function BookPage() {
  return <BookPageClient />;
}
