"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

// Next.js stays where it is when the link leads to the page already open, so on the home page this goes back to the top itself.
export default function HomeLink({ onClick, ...props }: Omit<ComponentProps<typeof Link>, "href">) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      href="/"
      onClick={(e) => {
        onClick?.(e);
        if (pathname === "/" && !e.ctrlKey && !e.metaKey && !e.shiftKey) window.scrollTo({ top: 0 });
      }}
    />
  );
}
