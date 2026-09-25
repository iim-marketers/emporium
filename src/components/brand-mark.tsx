import Image from "next/image";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const FIN = { w: 172, h: 109 };
const LOCKUP = { w: 660, h: 270 };

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
  inverse = false,
  className,
  onClick,
}: {
  variant?: "dark" | "light";
  preload?: boolean;
  inverse?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/"
      className={cn("relative flex min-w-0 items-center", className)}
      aria-label={`${site.name} home`}
      onClick={onClick}
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
        loading={preload ? "eager" : undefined}
        className={cn(
          "h-13 w-auto transition-opacity duration-300 max-mini:h-10",
          inverse && "opacity-0",
        )}
      />
      {variant === "dark" ? (
        <Image
          src="/images/logo-lockup-inverse.png"
          alt=""
          aria-hidden="true"
          width={LOCKUP.w}
          height={LOCKUP.h}
          className={cn(
            "absolute top-1/2 left-0 h-13 w-auto -translate-y-1/2 transition-opacity duration-300 max-mini:h-10",
            inverse ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </a>
  );
}
