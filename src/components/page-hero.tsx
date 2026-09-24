import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

const strip =
  "font-mono text-[11px] font-bold tracking-[0.28em] uppercase max-phablet:text-[10px] max-phablet:tracking-[0.2em]";

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  focus = "center",
  compact = false,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  crumbs?: Crumb[];
  image?: string;
  focus?: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[radial-gradient(700px_420px_at_0%_100%,rgba(217,31,42,0.14),transparent_65%),radial-gradient(760px_520px_at_78%_40%,rgba(63,91,214,0.32),transparent_68%)]"
      />
      <svg
        className="pointer-events-none absolute inset-0 -z-20 size-full opacity-60"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-40 470 Q 520 380 760 150 T 1260 60"
          fill="none"
          stroke="rgba(157,176,238,.35)"
          strokeWidth="1.5"
          strokeDasharray="2 10"
        />
        <circle cx="1080" cy="86" r="3.5" fill="#fff" />
      </svg>

      <div
        className={cn(
          wrap,
          "grid items-center gap-16 py-[clamp(40px,6vh,72px)]",
          image
            ? "grid-cols-[minmax(0,1fr)_clamp(240px,23vw,320px)] min-h-[clamp(360px,48vh,480px)]"
            : "grid-cols-1",
          "max-laptop:min-h-0 max-laptop:grid-cols-1 max-laptop:gap-10 max-laptop:pt-10 max-laptop:pb-12",
        )}
      >
        <Reveal className="max-w-160">
          {/* <p className={cn(strip, "flex items-center gap-3 text-haze")}>
            <span aria-hidden="true" className="size-1.5 bg-crimson" />
            {eyebrow}
          </p> */}
          <h1
            className={cn(
              "mt-5 font-hero leading-[1.04] font-normal tracking-[-0.015em] text-balance",
              compact
                ? "text-[clamp(32px,3.6vw,50px)] max-phablet:text-[clamp(28px,8.4vw,38px)]"
                : "text-[clamp(38px,4.6vw,64px)] max-phablet:text-[clamp(34px,10vw,46px)]",
            )}
          >
            {title}
          </h1>
          {lede ? (
            <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-white/70 max-phablet:text-[15px]">
              {lede}
            </p>
          ) : null}
          {children}
        </Reveal>

        {image ? (
          <Reveal className="relative w-full max-laptop:w-[min(230px,60vw)] max-laptop:justify-self-center">
            <CabinWindow src={image} focus={focus} />
          </Reveal>
        ) : null}
      </div>

      {/* <div className="border-t border-white/12 bg-navy/60 backdrop-blur-sm">
        <div
          className={cn(
            wrap,
            strip,
            "flex min-h-13 items-center justify-between gap-6 py-3 text-white/55",
          )}
        >
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 items-center gap-3">
              {route.map((crumb, i) => (
                <li key={crumb.label} className="flex min-w-0 items-center gap-3">
                  {i > 0 ? (
                    <span aria-hidden="true" className="font-sans text-crimson">
                      {"\u2708\uFE0E"}
                    </span>
                  ) : null}
                  {crumb.href && i < route.length - 1 ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={i === route.length - 1 ? "page" : undefined}
                      className={cn(i === route.length - 1 && "truncate text-white")}
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {meta.length > 0 ? (
            <ul className="flex flex-none items-center gap-6 max-tablet:hidden">
              {meta.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div> */}
    </section>
  );
}

const windowShape = "rounded-[42%/30%]";

/** The photo framed as an aircraft window: a pale cabin-panel bezel, inner
 *  shade and a glare across the pane. */
function CabinWindow({ src, focus }: { src: string; focus: string }) {
  return (
    <div
      className={cn(
        "relative aspect-3/4 w-full bg-[linear-gradient(160deg,#f5f7fd_0%,#dfe5f6_45%,#b8c2e6_100%)] p-[clamp(10px,1.1vw,16px)]",
        "shadow-[0_50px_90px_-40px_rgba(0,0,0,0.75),inset_0_2px_0_rgba(255,255,255,0.8)]",
        windowShape,
      )}
    >
      <div
        className={cn(
          "relative size-full overflow-hidden bg-navy-2",
          windowShape,
        )}
      >
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="(max-width: 960px) 78vw, 27vw"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.06)_28%,transparent_42%)]"
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 shadow-[inset_0_0_0_2px_rgba(13,22,66,0.35),inset_0_18px_36px_rgba(8,12,36,0.45),inset_0_-10px_24px_rgba(8,12,36,0.25)]",
            windowShape,
          )}
        />
      </div>
    </div>
  );
}
