"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import { IdentityBoundary } from "@/components/providers/IdentityBoundary";
import { MotionProvider } from "@/components/providers/MotionProvider";

/**
 * Composes every global provider into one tree.
 * Mounted once at the root layout (`src/app/layout.tsx`).
 *
 * Order matters:
 * 1. ThemeProvider - theme class on <html>, needed by every other provider
 * 2. SessionProvider - NextAuth client session
 * 3. QueryClientProvider - server state
 * 4. IdentityBoundary - wipe cache when the authenticated user changes
 * 5. MotionProvider - global motion configuration
 * 6. Toaster - mounted last so it sits above everything
 */
export function Providers({ children }: { children: ReactNode }) {
  // One QueryClient per browser session, created lazily to avoid
  // sharing between requests in SSR.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            retry: (failureCount, error) => {
              // Don't retry on auth errors or 4xx
              if (
                error instanceof Error &&
                "status" in error &&
                typeof error.status === "number" &&
                error.status >= 400 &&
                error.status < 500
              ) {
                return false;
              }

              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider
        // Keep backend access tokens fresh (~15m TTL) via the jwt callback.
        refetchInterval={4 * 60}
        refetchOnWindowFocus
      >
        <QueryClientProvider client={queryClient}>
          <IdentityBoundary>
            <MotionProvider>
              {children}
              <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                  className: "font-sans",
                  duration: 4000,
                }}
              />
            </MotionProvider>
          </IdentityBoundary>
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
