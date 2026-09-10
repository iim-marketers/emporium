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
        skeletonClassName={
          variant === "light" ? "bg-white/12 text-white/25" : undefined
        }
      />
    </a>
  );
}
