// Which design a request is served in (specs 007, 008). Pure function, used by proxy.ts and unit-tested.
// Editorial is served from the normal routes; every other design from its own page tree under
// /<design>/, while the visitor's address bar keeps the normal URL.

export const DESIGNS = ["editorial", "luminos", "nocturn", "grila", "atelier", "ghid"] as const;
export type Design = (typeof DESIGNS)[number];
export const DESIGN_COOKIE = "stil";

const isDesign = (v: string | null | undefined): v is Design => DESIGNS.includes(v as Design);

export type Decision =
  | { kind: "next" }
  | { kind: "rewrite"; path: string }
  | { kind: "redirect"; url: string; design: Design };

/** `search` is the query string with its "?", e.g. "?stil=nocturn"; `cookie` is the stored design. */
export function decide(pathname: string, search: string, cookie: string | undefined): Decision {
  const query = new URLSearchParams(search);
  const asked = query.get(DESIGN_COOKIE);
  if (isDesign(asked)) {
    query.delete(DESIGN_COOKIE);
    const rest = query.toString();
    return { kind: "redirect", url: pathname + (rest ? `?${rest}` : ""), design: asked };
  }
  if (DESIGNS.some((d) => d !== "editorial" && (pathname === `/${d}` || pathname.startsWith(`/${d}/`)))) {
    return { kind: "next" };
  }
  if (isDesign(cookie) && cookie !== "editorial") return { kind: "rewrite", path: `/${cookie}${pathname}` };
  return { kind: "next" };
}
