import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

const label = "font-mono text-[10px] font-bold tracking-[0.24em] uppercase";

export function ImmersiveHero({
  title,
  lede,
  image,
  focus = "center",
  dim = false,
  children,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  image: string;
  focus?: string;
  dim?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[clamp(560px,86vh,820px)] items-end overflow-hidden bg-navy text-white max-tablet:min-h-[620px] max-tablet:items-stretch">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 animate-kenburns object-cover motion-reduce:animate-none"
        style={{ objectPosition: focus }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,22,66,0.92)_0%,rgba(13,22,66,0.6)_38%,rgba(13,22,66,0.08)_72%),linear-gradient(180deg,rgba(13,22,66,0.45)_0%,transparent_30%,transparent_55%,var(--navy)_100%)] max-tablet:bg-[linear-gradient(180deg,rgba(13,22,66,0.88)_0%,rgba(13,22,66,0.45)_38%,rgba(13,22,66,0.25)_58%,rgba(13,22,66,0.85)_86%,var(--navy)_100%)]"
      />

      {dim ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,12,36,0.7)_0%,rgba(8,12,36,0.45)_50%,rgba(8,12,36,0.2)_100%)] max-tablet:bg-[rgba(8,12,36,0.45)]"
        />
      ) : null}

      <div
        className={cn(
          wrap,
          "pt-24 pb-[clamp(150px,19vh,200px)] laptop:pb-[clamp(170px,24vh,260px)] max-tablet:flex max-tablet:flex-col max-tablet:pt-10 max-tablet:pb-24",
        )}
      >
        <Reveal className="max-w-190 max-tablet:flex max-tablet:flex-1 max-tablet:flex-col">
          <h1 className="mt-5 max-w-[17ch] font-hero text-[clamp(38px,4vw,58px)] leading-[1.02] font-normal tracking-[-0.02em] text-balance max-phablet:text-[clamp(34px,10vw,46px)]">
            {title}
          </h1>
          {lede ? (
            <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-white/75 max-phablet:text-[15px]">
              {lede}
            </p>
          ) : null}
          <div className="max-tablet:mt-auto">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

export type Fact = {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
};

export function FactsCard({ fields }: { fields: Fact[] }) {
  return (
    <div className="relative z-10">
      <div className={cn(wrap, "-mt-[clamp(52px,7vh,72px)]")}>
        <Reveal
          as="div"
          className="grid grid-cols-4 overflow-hidden rounded-[12px] bg-white shadow-[0_30px_70px_-34px_rgba(13,22,66,0.5)] ring-1 ring-hairline max-laptop:grid-cols-2"
        >
          {fields.map(
            ({ label: name, value, icon: Icon, href, external }, i) => {
              const cell = cn(
                "group flex min-w-0 items-center gap-4 px-7 py-6 max-phablet:flex-col max-phablet:items-start max-phablet:gap-3 max-phablet:px-4 max-phablet:py-5",
                i > 0 && "laptop:border-l laptop:border-hairline",
                "max-laptop:[&:nth-child(even)]:border-l max-laptop:[&:nth-child(n+3)]:border-t max-laptop:border-hairline",
                href && "transition-colors duration-300 hover:bg-paper",
              );
              const body = (
                <>
                  <span className="grid size-12 flex-none place-items-center rounded-full bg-navy text-white transition-colors duration-300 group-hover:bg-crimson max-phablet:size-9">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0">
                    <p className={cn(label, "text-slate/60")}>{name}</p>
                    <p className="mt-1 text-[17px] leading-snug font-semibold tracking-[-0.01em] text-ink max-phablet:text-[15px]">
                      {value}
                    </p>
                  </div>
                </>
              );
              return href ? (
                <a
                  key={name}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={cell}
                >
                  {body}
                </a>
              ) : (
                <div key={name} className={cell}>
                  {body}
                </div>
              );
            },
          )}
        </Reveal>
      </div>
    </div>
  );
}

/** A photo held still behind everything inside, so white panels scroll over
 *  it. The clip matters: the sticky layer's negative margin lets it overhang
 *  the end of the stage by a full screen, which would cover the footer. */
export function Stage({
  image,
  focus = "center",
  priority = false,
  children,
}: {
  image: string;
  focus?: string;
  priority?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate [overflow:clip]">
      <div
        aria-hidden="true"
        className="sticky top-0 -z-10 -mb-[100svh] h-svh overflow-hidden bg-navy"
      >
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,66,0.55)_0%,rgba(13,22,66,0.25)_40%,rgba(13,22,66,0.55)_100%)]" />
      </div>
      {children}
    </div>
  );
}

export function CoverHero({
  label,
  title,
  lede,
  image,
  focus = "center",
  dim = false,
  children,
}: {
  label?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  image?: string;
  focus?: string;
  dim?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[clamp(520px,74vh,720px)] flex-col overflow-hidden text-white",
        image && "bg-navy",
      )}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          style={{ objectPosition: focus }}
        />
      ) : null}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          !image
            ? dim
              ? "bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(8,12,36,0.7),transparent)]"
              : "bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(8,12,36,0.5),transparent)]"
            : dim
              ? "bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(8,12,36,0.78),rgba(8,12,36,0.55))]"
              : "bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(8,12,36,0.62),rgba(8,12,36,0.35))]",
        )}
      />

      <div
        className={cn(
          wrap,
          "flex flex-1 flex-col items-center justify-center py-20 text-center",
        )}
      >
        <Reveal className="flex max-w-200 flex-col items-center">
          {label ? (
            <p className="flex items-center gap-4 font-mono text-[11px] font-bold tracking-[0.34em] text-white/85 uppercase max-phablet:text-[10px]">
              <span aria-hidden="true" className="h-px w-10 bg-crimson" />
              {label}
              <span aria-hidden="true" className="h-px w-10 bg-crimson" />
            </p>
          ) : null}
          <h1 className="mt-6 font-hero text-[clamp(38px,4.6vw,66px)] leading-[1.02] font-normal tracking-[-0.02em] text-balance [text-shadow:0_4px_40px_rgba(8,12,36,0.4)] max-phablet:text-[clamp(32px,9.5vw,44px)]">
            {title}
          </h1>
          {lede ? (
            <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-white/80 max-phablet:text-[15px]">
              {lede}
            </p>
          ) : null}
          {children ? (
            <div className="mt-8 flex flex-wrap justify-center gap-3.5 max-phablet:w-full max-phablet:flex-col">
              {children}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

export function Sheet({
  children,
  tab,
  side = "left",
  first = false,
  last = false,
  bare = false,
  full = false,
  className,
  id,
}: {
  children: React.ReactNode;
  tab?: string;
  side?: "left" | "right";
  first?: boolean;
  last?: boolean;
  bare?: boolean;
  full?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-8",
        first && "pt-24 max-phablet:pt-14",
        last && "pb-28 max-phablet:pb-16",
      )}
    >
      <div className={wrap}>
        <div
          className={cn(
            "relative",
            !full && "laptop:w-[88%]",
            !full && side === "right" && "laptop:ml-auto",
          )}
        >
          {tab ? (
            <span className="absolute -top-3.5 left-8 z-10 bg-crimson px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.24em] text-white uppercase max-phablet:left-5">
              {tab}
            </span>
          ) : null}
          <div
            className={cn(
              !bare &&
                cn(
                  sheetSurface,
                  "px-11 pt-12 pb-11 max-laptop:px-7 max-phablet:px-5 max-phablet:pt-10 max-phablet:pb-8",
                ),
              className,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export const sheetSurface =
  "rounded-[6px] bg-white shadow-[0_30px_70px_-30px_rgba(8,12,36,0.55)]";

export function SheetNote({
  lead,
  line,
  side = "left",
}: {
  lead: string;
  line: React.ReactNode;
  side?: "left" | "right";
}) {
  return (
    <section className="relative isolate flex h-[clamp(280px,50vh,460px)] items-center text-white">
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          side === "left"
            ? "bg-[linear-gradient(90deg,rgba(8,12,36,0.7)_0%,rgba(8,12,36,0.25)_55%,transparent_100%)]"
            : "bg-[linear-gradient(270deg,rgba(8,12,36,0.7)_0%,rgba(8,12,36,0.25)_55%,transparent_100%)]",
        )}
      />
      <Reveal
        className={cn(
          wrap,
          "flex",
          side === "right" && "justify-end text-right",
        )}
      >
        <div
          className={cn(
            "border-crimson py-2",
            side === "left" ? "border-l-[3px] pl-6" : "border-r-[3px] pr-6",
          )}
        >
          <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-white/80 uppercase max-phablet:text-[10px]">
            {lead}
          </p>
          <p className="mt-3 max-w-[16ch] font-sans text-[clamp(34px,4.4vw,64px)] leading-[1.02] font-semibold tracking-[-0.03em] [text-shadow:0_4px_30px_rgba(8,12,36,0.4)]">
            {line}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
