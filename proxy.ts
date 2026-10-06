import { NextResponse, type NextRequest } from "next/server";
import { DESIGN_COOKIE, decide } from "@/lib/design";

// Serves the visitor's chosen design (spec 007): the cookie picks the page tree, the URL stays the same.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const decision = decide(pathname, search, request.cookies.get(DESIGN_COOKIE)?.value);

  if (decision.kind === "rewrite") {
    return NextResponse.rewrite(new URL(decision.path + search, request.url));
  }
  if (decision.kind === "redirect") {
    const response = NextResponse.redirect(new URL(decision.url, request.url));
    if (decision.design === "editorial") response.cookies.delete(DESIGN_COOKIE);
    else response.cookies.set(DESIGN_COOKIE, decision.design, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }
  return NextResponse.next();
}

// Pages only: not Next's own files, not images or other files in public/.
export const config = {
  matcher: ["/((?!_next/|media/|.*\\.[a-z0-9]+$).*)"],
};
