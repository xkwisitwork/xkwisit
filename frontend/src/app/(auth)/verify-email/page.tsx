import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default function Page() {
  return <AuthForm mode="verify" />;
}
