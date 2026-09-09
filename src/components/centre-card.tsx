import { MapPinIcon, NavigationIcon, PhoneIcon } from "lucide-react";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { Reveal } from "@/components/reveal";
import { directionsUrl, instagramUrl, type Centre } from "@/lib/centres";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Instagram glyph — lucide dropped its brand icons, so this one is local     */
/* -------------------------------------------------------------------------- */

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Centre card                                                                */
/* -------------------------------------------------------------------------- */

const actionPill = [
  "inline-flex items-center gap-2 rounded-[999px] border border-hairline bg-paper",
  "px-3.5 py-2 font-mono text-[13.5px] tracking-[0.01em] text-royal",
  "transition-[background,color,border-color] duration-200",
  "hover:border-royal hover:bg-royal hover:text-white",
].join(" ");

const iconButton = [
  "grid size-9 flex-none place-items-center rounded-[999px] border border-hairline text-slate",
  "transition-[color,border-color,background] duration-200",
  "hover:border-royal hover:bg-cloud hover:text-royal",
].join(" ");

export function CentreCard({ centre }: { centre: Centre }) {
  return (
    <Reveal
      as="article"
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-(--r) border border-hairline bg-white",
        "transition-[transform,box-shadow,border-color] duration-250",
        "hover:translate-y-0 hover:border-cloud hover:shadow-(--shadow)",
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-cloud">
        <ImageWithSkeleton
          src={centre.image}
          alt=""
          fill
          sizes="(max-width: 560px) 92vw, (max-width: 960px) 45vw, 30vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,66,0)_18%,rgba(13,22,66,0.58)_58%,rgba(13,22,66,0.93)_100%)]"
        />

        <span className="absolute top-3.5 left-3.5 rounded-[999px] border border-white/25 bg-navy/45 px-3 py-1.5 font-mono text-[10.5px] font-bold tracking-[0.18em] text-white uppercase backdrop-blur-[6px]">
          {centre.state}
        </span>

        <div className="absolute inset-x-5 bottom-4 max-phone:inset-x-4">
          <h3 className="font-heading text-[19px] leading-tight font-semibold text-white">
            {centre.name}
          </h3>
          {centre.venue ? (
            <p className="mt-1 text-[13.5px] leading-snug text-haze">
              {centre.venue}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5.5 pt-5 pb-5.5">
        <p className="flex min-h-[4lh] grow gap-2.5 text-[14.5px] leading-[1.55] text-slate">
          <MapPinIcon className="mt-0.75 size-4 flex-none text-sky" />
          <span>
            {centre.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </p>

        <div className="mt-5 -mx-5.5 px-5.5 flex flex-wrap gap-2 border-t border-dashed border-hairline pt-4.5">
          {centre.phones.map((phone) => (
            <a key={phone.href} href={phone.href} className={actionPill}>
              <PhoneIcon className="size-3.5 flex-none" />
              {phone.label}
            </a>
          ))}
        </div>

        <div className="flex min-h-9 items-center justify-between gap-3 pt-4">
          <a
            href={directionsUrl(centre)}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex items-center gap-2 font-heading text-[14px] font-semibold text-royal transition-colors duration-200 hover:text-crimson-deep"
          >
            <NavigationIcon className="size-4 flex-none transition-transform duration-200 group-hover/link:translate-x-[2px]" />
            Get directions
          </a>

          {centre.instagram ? (
            <a
              href={instagramUrl(centre.instagram)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${centre.name} on Instagram — @${centre.instagram}`}
              title={`@${centre.instagram}`}
              className={iconButton}
            >
              <InstagramIcon className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
