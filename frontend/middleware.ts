import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Route protection map.
 * Staff app routes require an authenticated staff session.
 * Client portal routes require an authenticated client session.
 * Platform routes require isPlatformAdmin on the JWT.
 */
const STAFF_PREFIXES = [
  "/dashboard",
  "/clients",
  "/crm",
  "/sales",
  "/projects",
  "/tasks",
  "/approvals",
  "/campaigns",
  "/content",
  "/brand",
  "/analytics",
  "/intelligence",
  "/automation",
  "/reports",
  "/finance",
  "/team",
  "/knowledge",
  "/messaging",
  "/ai",
  "/services",
  "/portfolio",
  "/growth-assessment",
  "/notifications",
  "/settings",
];

const PLATFORM_PREFIXES = ["/platform", "/sheet-downloads"];

const CLIENT_PREFIXES = [
  "/home",
  "/attention",
  "/performance",
  "/brief",
  "/roadmap",
  "/messages",
  "/files",
  "/proposals",
  "/contracts",
  "/leads",
  "/invoices",
  "/portal",
];

const PUBLIC_PREFIXES = [
  "/",
  "/about",
  "/services",
  "/solutions",
  "/case-studies",
  "/insights",
  "/resources",
  "/pricing",
  "/growth-assessment",
  "/business-x-ray",
  "/book",
  "/contact",
  "/legal",
  "/status",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/mfa",
];

function matches(pathname: string, prefixes: string[]) {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isClientRole(role: unknown): boolean {
  return typeof role === "string" && role.startsWith("CLIENT_");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const hasSession = Boolean(token);
  const isPlatformAdmin = Boolean(token?.isPlatformAdmin);
  const role = token?.role;
  const clientUser = isClientRole(role);

  const isPublic = matches(pathname, PUBLIC_PREFIXES);
  const isPlatformRoute = matches(pathname, PLATFORM_PREFIXES);
  const isStaffRoute = matches(pathname, STAFF_PREFIXES);
  const isClientRoute = matches(pathname, CLIENT_PREFIXES);

  if ((isStaffRoute || isClientRoute || isPlatformRoute) && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && (pathname === "/login" || pathname === "/register")) {
    const dest = isPlatformAdmin
      ? "/platform"
      : clientUser
        ? "/home"
        : "/dashboard";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  // Platform: JWT must carry verified isPlatformAdmin from login/register.
  if (isPlatformRoute && !isPlatformAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Client users cannot enter the agency staff shell.
  if (isStaffRoute && clientUser) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Staff / platform admins should not use the client portal shell.
  if (isClientRoute && hasSession && !clientUser) {
    return NextResponse.redirect(
      new URL(isPlatformAdmin ? "/platform" : "/dashboard", request.url),
    );
  }

  if (isPublic || (!isStaffRoute && !isClientRoute && !isPlatformRoute)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
