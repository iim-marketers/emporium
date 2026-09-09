import Link from "next/link";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const FIN = { w: 172, h: 109 };
const LOCKUP = { w: 660, h: 270 };

export function TailFin({ className }: { className?: string }) {
  return (
    <ImageWithSkeleton
      src="/images/logo-fin.png"
      alt=""
      width={FIN.w}
      height={FIN.h}
      aria-hidden="true"
      /* Sizing lives on the wrapper so the skeleton inherits the same box. */
      wrapperClassName={cn("w-auto", className)}
      className="h-full w-auto"
    />
  );
}

export function BrandMark({
  variant = "dark",
  preload = false,
  className,
  onClick,
}: {
  /** `dark` = blue wordmark for light backgrounds, `light` = white for dark ones. */
  variant?: "dark" | "light";
  /** Only the header mark is above the fold — the footer's must not preload. */
  preload?: boolean;
  className?: string;
  /** The header passes its menu-dismiss here — the mark is a nav link too. */
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      className={cn("flex min-w-0 items-center", className)}
      aria-label={`${site.name} home`}
      onClick={onClick}
    >
      <ImageWithSkeleton
        src={
          variant === "light"
            ? "/images/logo-lockup-inverse.png"
            : "/images/logo-lockup.png"
        }
        alt={`${site.name} — ${site.tagline}`}
        width={LOCKUP.w}
        height={LOCKUP.h}
        preload={preload}
        wrapperClassName="h-13 max-mini:h-10"
        className="h-full w-auto"
        /* The inverse lockup sits on navy — a pale placeholder would flare. */
        skeletonClassName={variant === "light" ? "bg-white/15" : undefined}
      />
    </Link>
  );
}
