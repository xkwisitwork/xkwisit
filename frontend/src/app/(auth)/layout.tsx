import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Voyger-style auth shell: solid white on mobile; blurred photo backdrop on tablet+.
 * Logo / help live inside the auth card — no duplicate page header.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-white text-[#16024A] tablet:bg-[#EDEAF3]">
      {/* Blurred photographic atmosphere — tablet+ only */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden tablet:block">
        <Image
          src="/images/people/desk-review.jpg"
          alt=""
          fill
          priority
          className="scale-110 object-cover opacity-70 blur-2xl"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#F5F2FA]/72" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,transparent_20%,rgba(245,242,250,0.92)_75%)]" />
      </div>

      <main className="relative z-10 flex min-h-screen items-stretch justify-center bg-white px-0 py-0 tablet:items-center tablet:bg-transparent tablet:px-8 tablet:py-10">
        {children}
      </main>
    </div>
  );
}
