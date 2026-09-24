import Image from "next/image";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { Reveal } from "@/components/reveal";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const pageBand =
  "relative isolate overflow-hidden py-18 max-laptop:py-16 max-phablet:py-12";

export const pageTitle =
  "font-sans font-semibold tracking-[-0.025em] leading-[1.12] text-[clamp(26px,3vw,40px)]";

export const pageLabel =
  "font-mono text-[11px] font-bold tracking-[0.28em] uppercase";

export const pageCard = "rounded-[6px] border border-hairline bg-white";

export const pageProse =
  "text-[15.5px] leading-[1.75] text-slate max-phablet:text-[15px]";

export function Accent({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <em className={cn("not-italic", onDark ? "text-haze" : "text-crimson")}>
      {children}
    </em>
  );
}

export function PageHead({
  eyebrow,
  title,
  children,
  onDark = false,
  center = false,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  onDark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 max-w-180 max-phablet:mb-8",
        center && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          pageLabel,
          "flex items-center gap-3",
          center && "justify-center",
          onDark ? "text-haze" : "text-crimson",
        )}
      >
        {eyebrow}
      </p>
      <h2 className={cn("mt-4", pageTitle, onDark ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {children ? (
        <p
          className={cn(
            "mt-4 max-w-[60ch] text-[15.5px] leading-relaxed max-phablet:text-[15px]",
            center && "mx-auto",
            onDark ? "text-white/70" : "text-slate",
          )}
        >
          {children}
        </p>
      ) : null}
    </Reveal>
  );
}

/** A photo in a squared frame with an optional mono caption across its foot. */
export function Photo({
  src,
  alt = "",
  caption,
  sizes,
  className,
  imgClassName,
  mono = false,
}: {
  src: string;
  alt?: string;
  caption?: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  mono?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[6px] bg-cloud",
        className,
      )}
    >
      <ImageWithSkeleton
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          "object-cover transition-[transform,filter] duration-1000 ease-out group-hover:scale-[1.04]",
          mono && "grayscale group-hover:grayscale-0",
          imgClassName,
        )}
      />
      {caption ? (
        <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 to-transparent px-5 pt-12 pb-4 font-mono text-[10.5px] tracking-[0.24em] text-white uppercase">
          {caption}
        </span>
      ) : null}
    </div>
  );
}

/** Label-over-value cells split by hairlines, like the fields on a ticket.
 *  `cell` must repeat the section's background, since the gap is the rule. */
export function FactStrip({
  items,
  onDark = false,
  cell = onDark ? "bg-navy" : "bg-white",
  className,
}: {
  items: { label: string; value: React.ReactNode }[];
  onDark?: boolean;
  cell?: string;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-[6px] border",
        items.length >= 4
          ? "grid-cols-4 max-laptop:grid-cols-2"
          : items.length === 3
            ? "grid-cols-3 max-tablet:grid-cols-1"
            : "grid-cols-2 max-phone:grid-cols-1",
        onDark ? "border-white/15 bg-white/15" : "border-hairline bg-hairline",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cn("min-w-0 px-6 py-5.5 max-phablet:px-4.5", cell)}
        >
          <dt
            className={cn(
              pageLabel,
              "text-[10px] tracking-[0.22em]",
              onDark ? "text-haze" : "text-slate/70",
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cn(
              "mt-2 text-[18px] leading-snug font-semibold tracking-[-0.01em] max-phablet:text-[16.5px]",
              onDark ? "text-white" : "text-ink",
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Rows with hairline dividers, in place of tick-mark lists. */
export function IndexList({
  items,
  onDark = false,
  className,
}: {
  items: readonly React.ReactNode[];
  onDark?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("m-0 p-0", className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className={cn(
            "list-none border-t py-3.5 text-[15px] leading-snug first:border-t-0",
            onDark
              ? "border-white/12 text-white/85"
              : "border-hairline text-ink",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Closing band on a photograph: navy veil, framed hairline, centred copy. */
export function CtaBand({
  image,
  eyebrow,
  title,
  children,
  actions,
}: {
  image: string;
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-24 text-white max-laptop:py-20 max-phablet:py-16">
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-20 object-cover grayscale"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,22,66,0.9),rgba(13,22,66,0.72)_50%,rgba(13,22,66,0.92))]"
      />

      <Reveal className={cn(wrap, "relative text-center")}>
        <p className={cn(pageLabel, "text-haze")}>{eyebrow}</p>
        <h2
          className={cn(
            "mx-auto mt-5 max-w-[20ch] font-hero text-[clamp(32px,4.2vw,56px)] leading-[1.04] font-normal tracking-[-0.015em]",
          )}
        >
          {title}
        </h2>
        {children ? (
          <p className="mx-auto mt-5 max-w-[50ch] text-[16px] text-white/72 max-phablet:text-[15px]">
            {children}
          </p>
        ) : null}
        <div className="mt-9 flex flex-wrap justify-center gap-3.5 max-phablet:flex-col">
          {actions}
        </div>
      </Reveal>
    </section>
  );
}

export type ContactItem = {
  label: string;
  value: React.ReactNode;
  href?: string;
  external?: boolean;
  wide?: boolean;
};

export function ContactGrid({ items }: { items: ContactItem[] }) {
  return (
    <ul className="m-0 grid grid-cols-2 gap-3 p-0 max-phone:grid-cols-1">
      {items.map((item) => {
        const body = (
          <>
            <span className={cn(pageLabel, "text-[10px] text-haze")}>
              {item.label}
            </span>
            <span className="mt-2 block text-[15.5px] leading-snug font-semibold text-white">
              {item.value}
            </span>
          </>
        );
        return (
          <li
            key={item.label}
            className={cn(
              "list-none",
              item.wide && "col-span-2 max-phone:col-span-1",
            )}
          >
            {item.href ? (
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="block h-full rounded-[6px] border border-white/15 bg-white/4 px-5 py-4.5 transition-colors duration-300 hover:border-white/40 hover:bg-white/8"
              >
                {body}
              </a>
            ) : (
              <div className="h-full rounded-[6px] border border-white/15 bg-white/4 px-5 py-4.5">
                {body}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
