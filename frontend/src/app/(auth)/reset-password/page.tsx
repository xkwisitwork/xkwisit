import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function Page() {
  return <AuthForm mode="reset" />;
}
