/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";

import { CountUp } from "@/components/count-up";
import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { Marquee, MarqueeRow } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { arrow, btn } from "@/lib/btn";
import {
  accreditations,
  centreCards,
  empanelments,
  pillars,
  recruiterLogos,
  recruiterNames,
  stats,
  type Stat,
} from "@/lib/content";
import {
  cardBody,
  eyebrow,
  pillarHeading,
  sectionHeading,
  sectionPad,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

const onDarkText = "text-haze";

/* -------------------------------------------------------------------------- */
/*  Section heading                                                            */
/* -------------------------------------------------------------------------- */

export function SectionHead({
  eyebrow: eyebrowText,
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
        "mb-8 max-w-180 max-laptop:mb-11 max-phablet:mb-8.5",
        center && "mx-auto text-center",
        className,
      )}
    >
      <span className={cn(eyebrow, onDark && onDarkText)}>{eyebrowText}</span>
      <h2
        className={cn(
          "mt-4",
          sectionHeading,
          onDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {children ? (
        <p
          className={cn(
            "mt-4 text-[15px] max-tablet:text-[14px]",
            onDark ? "text-[#c1cbee]" : "text-slate",
          )}
        >
          {children}
        </p>
      ) : null}
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Recruiter marquee                                                          */
/* -------------------------------------------------------------------------- */

export function TrustStrip() {
  return (
    <div className="group overflow-hidden bg-navy-2 py-6.5 text-white">
      <p className="mb-4 text-center font-mono text-[11px] tracking-[0.3em] text-haze">
        OUR STUDENTS GET PLACED IN
      </p>
      <div
        className="flex w-max animate-marquee gap-14 whitespace-nowrap group-hover:paused motion-reduce:animate-none max-phablet:gap-10"
        aria-hidden="true"
      >
        {[...recruiterNames, ...recruiterNames].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-heading text-[22px] font-semibold tracking-[0.02em] text-white/50 max-phablet:text-[19px]"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats band                                                                 */
/* -------------------------------------------------------------------------- */

export function StatsBand({
  items = stats,
  className = "bg-white",
}: {
  items?: Stat[];
  className?: string;
}) {
  return (
    <section className={cn(className, sectionPad)}>
      <div
        className={cn(
          wrap,
          "grid grid-cols-4 gap-8.5",
          "max-laptop:grid-cols-2 max-laptop:gap-6.5 max-phone:grid-cols-1",
        )}
      >
        {items.map((stat) => (
          <Reveal className="border-l-2 border-crimson pl-5" key={stat.label}>
            <CountUp to={stat.to} suffix={stat.suffix} />
            <div className="mt-2 text-[15px] text-slate">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  What Emporium offers                                                       */
/* -------------------------------------------------------------------------- */

export function PillarGrid() {
  return (
    <div className="grid grid-cols-2 gap-5 max-phone:grid-cols-1">
      {pillars.map((pillar) => (
        <Reveal
          className="rounded-(--r) border border-hairline bg-white px-6.5 py-7.5 transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1 hover:border-cloud hover:shadow-(--shadow)"
          key={pillar.no}
        >
          <span className="float-right font-mono text-[12px] tracking-[0.2em] text-crimson">
            {pillar.no}
          </span>
          <div className="mb-4.5 grid size-11.5 place-items-center rounded-[12px] bg-cloud text-royal">
            {pillar.icon}
          </div>
          <h3 className={cn(pillarHeading, "max-w-[26ch]")}>{pillar.title}</h3>
          <p className={cardBody}>{pillar.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Recruiter logo wall                                                        */
/* -------------------------------------------------------------------------- */

function LogoTile({ src }: { src: string }) {
  return (
    <div
      className={cn(
        "relative h-30 w-38 flex-none rounded-[12px] border border-hairline bg-white",
        "max-phone:h-20 max-phone:w-31",
      )}
    >
      <ImageWithSkeleton
        src={src}
        alt=""
        fill
        sizes="152px"
        loading="eager"
        fetchPriority="low"
        className="object-contain p-3.5 max-phone:p-2.5"
      />
    </div>
  );
}

const MARQUEE_ROWS = 3;
const ROW_DURATION = ["48s", "62s", "40s"];

export function RecruiterWall() {
  const perRow = Math.ceil(recruiterLogos.length / MARQUEE_ROWS);
  const rows = Array.from({ length: MARQUEE_ROWS }, (_, r) =>
    recruiterLogos.slice(r * perRow, (r + 1) * perRow),
  );

  return (
    <Marquee label="Airlines, hotel groups and cruise lines that recruit Emporium students">
      {rows.map((row, i) => (
        <MarqueeRow
          key={i}
          duration={ROW_DURATION[i]}
          /* every other row drifts the other way */
          reverse={i % 2 === 1}
        >
          {row.map((src) => (
            <LogoTile key={src} src={src} />
          ))}
        </MarqueeRow>
      ))}
    </Marquee>
  );
}

/* -------------------------------------------------------------------------- */
/*  Accreditation                                                              */
/* -------------------------------------------------------------------------- */

export function AccreditationStrip({ note = true }: { note?: boolean }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-5 max-phone:grid-cols-2">
        {accreditations.map((item) => (
          <Reveal
            key={item.src}
            className="relative grid h-36 place-items-center rounded-(--r) border border-hairline bg-white px-5 py-4"
          >
            <ImageWithSkeleton
              src={item.src}
              alt={item.label}
              fill
              sizes="(max-width: 560px) 45vw, 22vw"
              className="object-contain p-5"
            />
          </Reveal>
        ))}
      </div>
      {/* {note ? (
        <p className="mt-6 max-w-[68ch] text-[15px] text-slate">
          {accreditationNote}
        </p>
      ) : null} */}
    </div>
  );
}

export function EmpanelmentList() {
  return (
    <div>
      <p className="font-heading text-[17px] font-semibold text-royal">
        {empanelments.intro}
      </p>
      <ul className="mt-4.5 grid grid-cols-2 gap-x-6 gap-y-3 p-0 max-phone:grid-cols-1">
        {empanelments.items.map((item) => (
          <li
            key={item}
            className="flex list-none items-start gap-3 text-[15.5px] text-slate"
          >
            <span className="flex-none font-mono font-bold text-crimson">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Training centres                                                           */
/* -------------------------------------------------------------------------- */

export function CentreGrid() {
  return (
    /* One row of six on desktop, as the institute presents them. No card
       chrome — the crests sit straight on the section background. */
    <div className="grid grid-cols-6 gap-x-6 gap-y-11 max-laptop:grid-cols-3 max-phone:grid-cols-2">
      {centreCards.map((centre) => (
        <Reveal key={centre.address} as="article" className="text-center">
          {/* Institution crests, not photographs, and all square — contain,
              never crop. */}
          <div className="relative mx-auto aspect-square w-full max-w-45">
            <ImageWithSkeleton
              src={centre.image}
              alt=""
              fill
              sizes="(max-width: 560px) 45vw, (max-width: 960px) 30vw, 180px"
              className="object-contain"
            />
          </div>
          <p className="mt-4.5 text-[14.5px] leading-snug text-slate italic">
            {centre.address}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Eligibility call-out                                                       */
/* -------------------------------------------------------------------------- */

export function EligibilityBar({ note }: { note: string }) {
  return (
    <Reveal className="mt-11 flex flex-wrap items-center justify-between gap-4 rounded-(--r) border border-hairline bg-paper px-7 py-6 max-tablet:flex-col max-tablet:items-stretch max-tablet:gap-5">
      <p className="text-[15.5px] text-slate">
        <b className="text-royal">Eligibility:</b> {note}
      </p>
      <Link
        href="/enquire"
        className={btn({ variant: "dark", block: "tablet" })}
      >
        Check your eligibility <span className={arrow}>→</span>
      </Link>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                               */
/* -------------------------------------------------------------------------- */

export function EmptyState({
  title,
  body,
  className,
}: {
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "grid place-items-center gap-2 rounded-(--r) border border-dashed border-hairline bg-white px-7 py-14 text-center",
        className,
      )}
    >
      <p className="font-heading text-[18px] font-semibold text-ink">{title}</p>
      <p className={cn(cardBody, "max-w-[46ch]")}>{body}</p>
    </Reveal>
  );
}
