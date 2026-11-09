import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Packages",
};

export default function PackagesPage() {
  redirect("/pricing");
}
