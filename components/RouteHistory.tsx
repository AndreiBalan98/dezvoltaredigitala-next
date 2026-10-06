"use client";

// Remembers the paths visited inside the app. Client-side navigation does not update
// document.referrer, so the calculator's back link asks this list instead.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const visited: string[] = [];

/** The most recent path visited in this tab that is not `current`, or null after a fresh page load. */
export function previousPath(current: string): string | null {
  for (let i = visited.length - 1; i >= 0; i--) if (visited[i] !== current) return visited[i];
  return null;
}

export default function RouteHistory() {
  const pathname = usePathname();
  useEffect(() => {
    if (visited[visited.length - 1] !== pathname) visited.push(pathname);
  }, [pathname]);
  return null;
}
