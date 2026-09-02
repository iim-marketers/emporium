import Image from "next/image";
import Link from "next/link";

import { CountUp } from "@/components/count-up";
import { Marquee, MarqueeRow } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { arrow, btn } from "@/lib/btn";
import {
  accreditationNote,
  accreditations,
  centreCards,
  empanelments,
  pillars,
  recruiterLogos,
  recruiterNames,
  stats,
  testimonialImages,
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

/** Swaps the eyebrow to its on-dark tint inside navy sections. */
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
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  onDark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "mb-8 max-w-180 max-laptop:mb-11 max-phablet:mb-8.5",
        center && "mx-auto text-center",
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
            "mt-4 text-[18px] max-tablet:text-[17px]",
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
        className="flex w-max animate-marquee gap-14 whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none max-phablet:gap-10"
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

/** One logo tile. Fixed width so the marquee rows keep an even rhythm. */
function LogoTile({ src }: { src: string }) {
  return (
    <div
      className={cn(
        "relative h-30 w-38 flex-none rounded-[12px] border border-hairline bg-white",
        "max-phone:h-20 max-phone:w-31",
      )}
    >
      {/* Eager: a lazy tile would slide into the marquee blank and pop in. */}
      <Image
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
            <Image
              src={item.src}
              alt={item.label}
              fill
              sizes="(max-width: 560px) 45vw, 22vw"
              className="object-contain p-5"
            />
          </Reveal>
        ))}
      </div>
      {note ? (
        <p className="mt-6 max-w-[68ch] text-[15px] text-slate">
          {accreditationNote}
        </p>
      ) : null}
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
    <div className="grid grid-cols-3 gap-6 max-laptop:grid-cols-2 max-phone:grid-cols-1">
      {centreCards.map((centre) => (
        <Reveal
          key={centre.address}
          className="overflow-hidden rounded-(--r) border border-hairline bg-white transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:shadow-(--shadow)"
          as="article"
        >
          {/* These are institution crests, not photographs — contain, don't crop. */}
          <div className="relative aspect-16/10 border-b border-hairline bg-paper">
            <Image
              src={centre.image}
              alt=""
              fill
              sizes="(max-width: 560px) 92vw, (max-width: 960px) 45vw, 30vw"
              className="object-contain p-6"
            />
          </div>
          <p className="px-5.5 py-5 text-[15px] text-slate">{centre.address}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Student testimonials                                                       */
/* -------------------------------------------------------------------------- */

/**
 * The institute publishes its testimonials as screenshots of student messages,
 * so they are shown as images rather than re-typed as quotes we cannot verify.
 * Ten of them is too many to sit still, so they drift like the recruiter wall.
 */
export function TestimonialGallery() {
  return (
    <Marquee label="Messages from students who trained at Emporium" className="gap-0">
      <MarqueeRow duration="66s" gap="gap-5">
        {testimonialImages.map((src, i) => (
          <figure
            key={src}
            className="w-[clamp(240px,28vw,340px)] flex-none overflow-hidden rounded-(--r) border border-hairline bg-white p-2.5 shadow-[0_10px_30px_-20px_rgba(13,22,66,0.5)]"
          >
            {/* Source stills vary in size, so a fixed box keeps the row even. */}
            <div className="relative aspect-16/10 overflow-hidden rounded-[10px] bg-cloud">
              <Image
                src={src}
                alt={`Student testimonial ${i + 1}`}
                fill
                sizes="340px"
                loading="eager"
                fetchPriority="low"
                className="object-cover"
              />
            </div>
          </figure>
        ))}
      </MarqueeRow>
    </Marquee>
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
