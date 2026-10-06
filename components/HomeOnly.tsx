"use client";

import { usePathname } from "next/navigation";

// Shows its children on the home page only — for things in a layout that every page shares.
export default function HomeOnly({ children }: { children: React.ReactNode }) {
  return usePathname() === "/" ? children : null;
}
