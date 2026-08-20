import Link from "next/link";

import { BoardingPassGrid } from "@/components/boarding-pass";
import { DepartureBoard } from "@/components/departure-board";
import { EnquirySection } from "@/components/enquiry-section";
import { Reveal } from "@/components/reveal";
import {
  AdmissionSteps,
  CabinWindows,
  FacilityGrid,
  PillarGrid,
  SectionHead,
  StatsBand,
  StoryGrid,
  TrustStrip,
} from "@/components/sections";
import { arrow, btn } from "@/lib/btn";
import { programs } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  eyebrowOnDark,
  heroPad,
  heroSurface,
  lede,
  sectionPad,
  trainSurface,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: `${site.name} — Aviation & Hospitality Training · ${site.tagline}`,
  description: site.description,
  path: "/",
  keywords: [
    "aviation institute India",
    "cabin crew academy",
    "placement support",
  ],
});

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className={cn(heroSurface, heroPad)}>
        <svg
          className="pointer-events-none absolute inset-0 opacity-50"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M-50 640 Q 500 120 1300 260"
            fill="none"
            stroke="rgba(157,176,238,.35)"
            strokeWidth="1.5"
            strokeDasharray="2 10"
          />
          <circle cx="1050" cy="255" r="4" fill="#fff" />
        </svg>

        <div
          className={cn(
            wrap,
            "grid grid-cols-[1.05fr_0.95fr] items-center gap-14",
            "max-laptop:grid-cols-1 max-laptop:gap-11",
          )}
        >
          <div>
            <span className={eyebrowOnDark}>
              Aviation · Hospitality · Travel · Customer Service
            </span>
            <h1 className="mt-5.5 text-[clamp(30px,4vw,52px)] font-medium max-phablet:text-[clamp(26px,6.5vw,36px)]">
              Train for the skies.
              <br />
              <em className="text-haze not-italic">Build a new nation.</em>
            </h1>
            <p className={lede}>
              Emporium prepares India&apos;s next generation of cabin crew,
              airport ground staff and hospitality professionals — with
              industry-current training, grooming and dedicated placement
              support.
            </p>
            <div className="mt-8.5 flex flex-wrap gap-3.5 max-phablet:mt-7 max-phablet:flex-col max-phablet:items-stretch max-phablet:gap-3">
              <Link href="/enquire" className={btn({ block: "phone" })}>
                Apply for the next intake <span className={arrow}>→</span>
              </Link>
              <Link
                href="/programs"
                className={btn({ variant: "ghost", block: "phone" })}
              >
                Explore programs
              </Link>
            </div>
            <div className="mt-6.5 flex flex-wrap gap-5.5 font-mono text-[13.5px] text-[#93a2d6] max-phablet:gap-x-4.5 max-phablet:gap-y-2.5 max-phablet:text-[12.5px]">
              <span className="flex items-center gap-2">
                <i className="size-1.75 rounded-full bg-green shadow-[0_0_0_4px_rgba(62,207,142,0.18)]" />{" "}
                Admissions open
              </span>
              <span className="flex items-center gap-2">
                6 career-ready programs
              </span>
              <span className="flex items-center gap-2">
                Placement cell on campus
              </span>
            </div>
          </div>

          <DepartureBoard />
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <TrustStrip />

      {/* ============ STATS ============ */}
      <StatsBand />

      {/* ============ WHY EMPORIUM ============ */}
      <section className={cn("bg-paper", sectionPad)} id="why">
        <div className={wrap}>
          <SectionHead
            eyebrow="Why Emporium"
            title="A runway from the classroom to the cabin."
          >
            Skilling is nation-building. Every course at Emporium is built to
            turn ambition into an interview-ready, world-ready professional —
            not just a certificate.
          </SectionHead>
          <PillarGrid />
        </div>
      </section>

      {/* ============ PROGRAMS ============ */}
      <section
        className={cn(
          "bg-[linear-gradient(180deg,#fff,var(--paper))]",
          sectionPad,
        )}
        id="programs"
      >
        <div className={wrap}>
          <SectionHead
            eyebrow="Programs · Choose your destination"
            title="Six ways to board your career."
          >
            Each program is your boarding pass into a specific role. Pick the
            one that matches where you want to land.
          </SectionHead>
          <BoardingPassGrid items={programs} />
        </div>
      </section>

      {/* ============ TRAINING EXPERIENCE ============ */}
      <section className={cn(trainSurface, sectionPad)} id="train">
        <div className={cn(wrap, "relative")}>
          <SectionHead
            eyebrow="The training floor"
            title="Where practice feels like the real thing."
            onDark
          >
            Confidence comes from repetition in the right environment. Emporium
            campuses are built to rehearse the job before the job.
          </SectionHead>
          <FacilityGrid />
          {/* <CabinWindows /> */}
        </div>
      </section>

      {/* ============ PLACEMENTS ============ */}
      <section className={cn("bg-paper", sectionPad)} id="placements">
        <div className={wrap}>
          <SectionHead
            eyebrow="Placements & alumni"
            title="The window seat, earned."
          >
            Our placement cell runs drives, referrals and interview prep
            year-round. Here&apos;s the kind of journey Emporium is built to
            support.
          </SectionHead>
          <StoryGrid />
          <Reveal className="mt-10">
            <Link
              href="/placements"
              className={btn({ variant: "dark", block: "phone" })}
            >
              How placement support works <span className={arrow}>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ ADMISSIONS ============ */}
      <section className={cn("bg-white", sectionPad)} id="admit">
        <div className={wrap}>
          <SectionHead eyebrow="Admissions" title="Four steps to boarding.">
            A simple, guided path from your first enquiry to your first day on
            the job.
          </SectionHead>
          <AdmissionSteps />
        </div>
      </section>

      {/* ============ ENQUIRE ============ */}
      <EnquirySection />
    </>
  );
}
