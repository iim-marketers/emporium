import Link from "next/link";

import { Reveal } from "@/components/reveal";
import {
  eyebrowOnDark,
  heroSurface,
  ledeWide,
  pageHeading,
  pageHeroPad,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className={cn(heroSurface, pageHeroPad)}>
      <svg
        className="pointer-events-none absolute inset-0 opacity-50"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-50 640 Q 500 120 1300 260"
          fill="none"
          stroke="rgba(157,176,238,.35)"
          strokeWidth="1.5"
          strokeDasharray="2 10"
        />
        <circle cx="1050" cy="255" r="4" fill="#fff" />
      </svg>

      <div className={cn(wrap, "relative")}>
        <Reveal>
          <span className={eyebrowOnDark}>{eyebrow}</span>
          <h1 className={cn("mt-4.5", pageHeading)}>{title}</h1>
          {lede ? <p className={ledeWide}>{lede}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
