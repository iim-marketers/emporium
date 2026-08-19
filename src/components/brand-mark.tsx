import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Logo art is derived from `public/images/logo-erp.png` (the master supplied by
 * the institute): `logo-fin.png` is the emblem alone, `logo-lockup.png` the full
 * lockup for light surfaces, `logo-lockup-inverse.png` the same with the
 * wordmark knocked out to white for dark ones.
 */
const FIN = { w: 172, h: 109 };
const LOCKUP = { w: 660, h: 270 };

/** The tail-fin emblem — a red fin carrying the white compass ornament. */
export function TailFin({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo-fin.png"
      alt=""
      width={FIN.w}
      height={FIN.h}
      aria-hidden="true"
      className={cn("w-auto", className)}
    />
  );
}

export function BrandMark({
  variant = "dark",
  preload = false,
  className,
}: {
  /** `dark` = blue wordmark for light backgrounds, `light` = white for dark ones. */
  variant?: "dark" | "light";
  /** Only the header mark is above the fold — the footer's must not preload. */
  preload?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("flex min-w-0 items-center", className)}
      aria-label={`${site.name} home`}
    >
      <Image
        src={
          variant === "light"
            ? "/images/logo-lockup-inverse.png"
            : "/images/logo-lockup.png"
        }
        alt={`${site.name} — ${site.tagline}`}
        width={LOCKUP.w}
        height={LOCKUP.h}
        preload={preload}
        className="h-13 w-auto max-mini:h-10"
      />
    </Link>
  );
}
