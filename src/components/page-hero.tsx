import Link from "next/link";

import { Reveal } from "@/components/reveal";
import {
  eyebrowOnDark,
  heroSurface,
  ledeWide,
  pageHeroPad,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/** Dark gradient masthead used at the top of every inner page. */
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
        {/* {crumbs.length > 0 ? (
          <nav
            className="mb-5.5 flex items-center gap-2.5 font-mono text-[11.5px] tracking-[0.18em] text-[#93a2d6] uppercase max-phablet:flex-wrap max-phablet:gap-y-1"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="contents">
                <span className="opacity-50">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null} */}

        <Reveal>
          <span className={eyebrowOnDark}>{eyebrow}</span>
          <h1 className="mt-4.5 text-[clamp(28px,4.6vw,50px)] max-phablet:text-[clamp(22px,7.6vw,34px)]">
            {title}
          </h1>
          {lede ? <p className={ledeWide}>{lede}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
