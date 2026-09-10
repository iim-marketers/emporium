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
  className,
  onClick,
}: {
  variant?: "dark" | "light";
  preload?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/"
      className={cn("flex min-w-0 items-center", className)}
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
        className="h-13 w-auto max-mini:h-10"
      />
    </a>
  );
}
