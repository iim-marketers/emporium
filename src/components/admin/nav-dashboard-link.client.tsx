"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** The active state reuses Payload's own indicator element, so the pill
 *  styling in custom.css applies here exactly as it does to the collections. */
export function DashboardLink({ href }: { href: string }) {
  const isActive = usePathname() === href;

  return (
    <Link className="nav__link em-nav-dashboard" href={href} id="nav-dashboard" prefetch={false}>
      {isActive ? <div className="nav__link-indicator" /> : null}
      <span className="nav__link-label">Dashboard</span>
    </Link>
  );
}
