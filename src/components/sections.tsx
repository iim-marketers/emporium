import Link from "next/link";

import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { arrow, btn } from "@/lib/btn";
import {
  admissionSteps,
  eligibilityNote,
  facilities,
  pillars,
  recruiters,
  stats,
  stories,
  type Facility,
  type FacilityIcon,
} from "@/lib/content";
import { eyebrow, sectionPad, wrap } from "@/lib/styles";
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
        "mb-14 max-w-180 max-laptop:mb-11 max-phablet:mb-8.5",
        center && "mx-auto text-center",
      )}
    >
      <span className={cn(eyebrow, onDark && onDarkText)}>{eyebrowText}</span>
      <h2
        className={cn(
          "mt-4 font-medium text-[clamp(30px,3.6vw,44px)]",
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
        TRAINED FOR THE WORLD&apos;S LEADING AIRLINES &amp; HOSPITALITY BRANDS
      </p>
      <div
        className="flex w-max animate-marquee gap-14 whitespace-nowrap group-hover:paused motion-reduce:animate-none max-phablet:gap-10"
        aria-hidden="true"
      >
        {[...recruiters, ...recruiters].map((name, i) => (
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

export function StatsBand() {
  return (
    <section className={cn("bg-white", sectionPad)}>
      <div
        className={cn(
          wrap,
          "grid grid-cols-4 gap-8.5",
          "max-laptop:grid-cols-2 max-laptop:gap-6.5 max-phone:grid-cols-1",
        )}
      >
        {stats.map((stat) => (
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
/*  Pillars                                                                    */
/* -------------------------------------------------------------------------- */

export function PillarGrid() {
  return (
    <div className="grid grid-cols-3 gap-5 max-laptop:grid-cols-2 max-phone:grid-cols-1">
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
          <h3 className="mb-2.25 font-semibold text-[20px]">{pillar.title}</h3>
          <p className="text-[15.5px] text-slate">{pillar.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Facilities                                                                 */
/* -------------------------------------------------------------------------- */

const facilityIcons: Record<FacilityIcon, React.ReactNode> = {
  cabin: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <circle cx="8" cy="12" r="2.4" />
      <circle cx="16" cy="12" r="2.4" />
    </>
  ),
  grooming: (
    <>
      <ellipse cx="12" cy="9" rx="6" ry="7" />
      <path d="M12 16 v5 M8 21 h8" />
    </>
  ),
  interview: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11 a6 6 0 0 0 12 0 M12 17 v4 M8 21 h8" />
    </>
  ),
  lab: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20 h8 M12 16 v4" />
    </>
  ),
};

export function FacilityIconSvg({ icon }: { icon: FacilityIcon }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      {facilityIcons[icon]}
    </svg>
  );
}

export function FacilityGrid({ items = facilities }: { items?: Facility[] }) {
  return (
    <div className="grid grid-cols-4 gap-4.5 max-laptop:grid-cols-2 max-laptop:gap-6.5 max-phone:grid-cols-1">
      {items.map((facility) => (
        <Reveal
          className="rounded-(--r) border border-(--line-d) bg-white/4 px-5.5 py-6.5 transition-[background,transform] duration-250 hover:-translate-y-1 hover:bg-white/8"
          key={facility.title}
        >
          <div className="mb-4 text-haze">
            <FacilityIconSvg icon={facility.icon} />
          </div>
          <h3 className="mb-2 text-[18px]">{facility.title}</h3>
          <p className="text-[14.5px] text-[#aebbe6]">{facility.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function CabinWindows() {
  return (
    <Reveal
      className="mt-15 flex justify-center gap-3.5 max-tablet:mt-11 max-tablet:flex-wrap"
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          className="h-19.5 w-13 rounded-[26px/40px] border-[1.5px] border-(--line-d) bg-[linear-gradient(180deg,#0a1030,#122055)] shadow-[inset_0_8px_20px_rgba(63,91,214,0.25)] max-tablet:h-16 max-tablet:w-10.5"
          key={i}
        />
      ))}
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Alumni stories                                                             */
/* -------------------------------------------------------------------------- */

export function StoryGrid() {
  return (
    <div className="grid grid-cols-3 gap-5.5 max-laptop:grid-cols-2 max-phone:grid-cols-1">
      {stories.map((story) => (
        <Reveal
          className="relative rounded-(--r) border border-hairline bg-white px-6.5 py-7 transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:shadow-(--shadow)"
          key={story.name}
        >
          <div className="absolute top-5.5 right-5.5 rotate-6 rounded-[8px] border-[1.5px] border-crimson px-2 py-1.25 text-center font-mono text-[9px] leading-[1.3] tracking-[0.12em] text-crimson opacity-85 max-mini:top-4.5 max-mini:right-4.5">
            {story.stamp[0]}
            <br />
            {story.stamp[1]}
          </div>
          {/* keeps the rotated stamp clear of the quote once cards get wider */}
          <div className="mt-2 mb-5 text-[16px] text-ink max-laptop:pr-17 max-phone:pr-15.5">
            &ldquo;{story.quote}&rdquo;
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-[linear-gradient(135deg,var(--royal),var(--sky))] font-heading text-[13px] font-bold text-white">
              {story.initials}
            </span>
            <div>
              <b className="block font-heading text-[16px]">{story.name}</b>
              <span className="text-[13px] text-slate">{story.role}</span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Admission steps                                                            */
/* -------------------------------------------------------------------------- */

export function AdmissionSteps({
  showEligibility = true,
}: {
  showEligibility?: boolean;
}) {
  return (
    <>
      <div className="grid grid-cols-4 gap-5.5 max-laptop:grid-cols-2 max-laptop:gap-6.5 max-phone:grid-cols-1">
        {admissionSteps.map((step) => (
          <Reveal className="relative flex flex-col pt-7" key={step.n}>
            <div className="font-mono text-[14px] font-bold tracking-widest text-crimson">
              {step.n}
            </div>
            <h3 className="mt-3.5 mb-2 text-[20px]">{step.title}</h3>
            <p className="mb-1 text-[15px] text-slate">{step.body}</p>
            {/* <div className="mt-auto h-0.75 overflow-hidden rounded-[3px] bg-cloud">
              <i
                className="block h-full bg-crimson"
                style={{ width: step.progress }}
              />
            </div> */}
          </Reveal>
        ))}
      </div>

      {showEligibility ? (
        <Reveal className="mt-11 flex flex-wrap items-center justify-between gap-4 rounded-(--r) border border-hairline bg-paper px-7 py-6 max-tablet:flex-col max-tablet:items-stretch max-tablet:gap-5">
          <p className="text-[15.5px] text-slate">
            <b className="text-royal">Eligibility:</b> {eligibilityNote}
          </p>
          <Link
            href="/enquire"
            className={btn({ variant: "dark", block: "tablet" })}
          >
            Check your eligibility <span className={arrow}>→</span>
          </Link>
        </Reveal>
      ) : null}
    </>
  );
}
