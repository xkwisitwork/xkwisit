/**
 * When another device signs in, the backend returns SESSION_SUPERSEDED.
 * Force a clean logout + login redirect (once).
 */

const FLAG = "xkwisit:sessionReplaced";
let handling = false;

export function markSessionReplaced() {
  try {
    sessionStorage.setItem(FLAG, "1");
  } catch {
    // ignore
  }
}

export function consumeSessionReplacedFlag(): boolean {
  try {
    if (sessionStorage.getItem(FLAG) === "1") {
      sessionStorage.removeItem(FLAG);
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

export function forceLogoutForSessionConflict() {
  if (typeof window === "undefined" || handling) return;
  handling = true;
  markSessionReplaced();

  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
  void fetch(`${base}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
    .catch(() => {})
    .finally(() => {
      void import("next-auth/react").then(({ signOut }) => {
        void signOut({ callbackUrl: "/login?sessionReplaced=1" });
      });
    });
}
