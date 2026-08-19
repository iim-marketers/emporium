import Link from "next/link";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The tail-fin emblem — a red fin carrying a white compass star. */
export function TailFin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M6 33 L27 6 C31 1 39 3 38 10 L34 33 C33.4 36 31 37 28 37 L10 37 C6.5 37 4.5 35 6 33 Z"
        fill="#d91f2a"
      />
      <g stroke="#fff" strokeWidth="1.7" strokeLinecap="round">
        <path d="M26 14 V28 M19 21 H33 M21.5 16.5 L30.5 25.5 M30.5 16.5 L21.5 25.5" />
      </g>
    </svg>
  );
}

export function BrandMark({
  variant = "dark",
  className,
}: {
  /** `dark` = dark type for light backgrounds, `light` = white type for dark backgrounds. */
  variant?: "dark" | "light";
  className?: string;
}) {
  const light = variant === "light";

  return (
    <Link
      href="/"
      className={cn("flex min-w-0 items-center gap-2.75 max-mini:gap-2", className)}
      aria-label={`${site.name} home`}
    >
      <TailFin className="size-8.5 flex-none max-mini:size-7.5" />
      <span className="flex flex-col leading-none">
        <b
          className={cn(
            "font-heading text-[21px] font-bold tracking-[0.02em] whitespace-nowrap max-mini:text-[19px]",
            light ? "text-white" : "text-royal",
          )}
        >
          EMPORIUM
        </b>
        {/* The letter-spaced tagline is the widest part of the mark and cannot
            wrap, so on the narrowest phones it tightens rather than being
            dropped — at full size it would run into the header CTA. */}
        <span
          className={cn(
            "mt-0.75 font-mono text-[8.5px] tracking-[0.28em] whitespace-nowrap opacity-[0.72]",
            "max-mini:text-[7px] max-mini:tracking-[0.14em]",
            light ? "text-haze" : "text-slate",
          )}
        >
          BUILDING A NEW NATION
        </span>
      </span>
    </Link>
  );
}
