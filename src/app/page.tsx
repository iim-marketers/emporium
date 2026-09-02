/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";

import { BoardingPassGrid } from "@/components/boarding-pass";
import { DepartureBoard } from "@/components/departure-board";
import { EnquirySection } from "@/components/enquiry-section";
import { JobList } from "@/components/job-board";
import { BlogGrid, NewsList } from "@/components/news";
import { Reveal } from "@/components/reveal";
import {
  AccreditationStrip,
  CentreGrid,
  RecruiterWall,
  SectionHead,
  StatsBand,
  TestimonialGallery,
  TrustStrip,
} from "@/components/sections";
import { arrow, btn } from "@/lib/btn";
import { headlineClaim } from "@/lib/content";
import { jobs } from "@/lib/jobs";
import { programs } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  columnHeading,
  eyebrowOnDark,
  heroCta,
  heroHeading,
  heroPad,
  heroSurface,
  lede,
  sectionPad,
  surfacePaper,
  surfaceWhite,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: `${site.name} — Advanced certificate courses in Aviation, Hospitality & Cruise Line`,
  description: site.description,
  path: "/",
  keywords: [
    "aviation institute India",
    "cabin crew academy",
    "cruise line course",
    "placement assistance",
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
            // past 1280px the board gets the larger share — it reads better big
            "xl:grid-cols-[1fr_1.15fr]",
            "max-laptop:grid-cols-1 max-laptop:gap-11",
          )}
        >
          <div>
            {/* <span className={eyebrowOnDark}>{site.tagline}</span> */}
            <span className={eyebrowOnDark}>
              Aviation · Hospitality · Cruise
            </span>
            <h1 className={cn("mt-5.5", heroHeading)}>
              Train for the skies.
              <br />
              <em className="text-haze not-italic">Build a new nation.</em>
            </h1>
            <p className={lede}>
              Emporium Certification Courses on Aviation, Hospitality Management
              and Cruise Lines — with grooming, communication and 100% placement
              assistance through our dedicated Placement Cell.
            </p>
            <div className={heroCta}>
              <Link href="/enquire#enquire" className={btn({ block: "phone" })}>
                Enroll Now
              </Link>
              <Link
                href="/about"
                className={btn({ variant: "ghost", block: "phone" })}
              >
                Read More
              </Link>
            </div>
            <div className="hidden mt-6.5 md:flex flex-wrap gap-5.5 font-mono text-[13.5px] text-[#93a2d6] max-phablet:gap-x-4.5 max-phablet:gap-y-2.5 max-phablet:text-[12.5px]">
              <span className="flex items-center gap-2">
                <i className="size-1.75 rounded-full bg-green shadow-[0_0_0_4px_rgba(62,207,142,0.18)]" />{" "}
                Admissions open
              </span>
              <span className="flex items-center gap-2">
                Aviation · Hospitality · Cruise
              </span>
              <span className="flex items-center gap-2">
                10+ centres in India
              </span>
            </div>
          </div>

          <DepartureBoard />
        </div>
      </section>

      {/* ============ RECRUITER MARQUEE ============ */}
      <TrustStrip />

      {/* ============ LIVE HIRING DRIVES ============ */}
      <section className={cn(surfacePaper, sectionPad)} id="jobs">
        <div className={wrap}>
          <SectionHead
            eyebrow="Newest jobs"
            title="Campus interviews, happening now."
          >
            Airlines, airports and hotel groups screen at Emporium centres
            through the year. Message the number on a drive to register.
          </SectionHead>
          <JobList items={jobs.slice(0, 2)} />
        </div>
      </section>

      {/* ============ COURSES ============ */}
      <section
        className={cn(
          "bg-[linear-gradient(180deg,#fff,var(--paper))]",
          sectionPad,
        )}
        id="courses"
      >
        <div className={wrap}>
          <SectionHead
            eyebrow="Our placement linked courses"
            title="Offered by Emporium."
          >
            Three certificate courses, each a boarding pass into a specific
            industry. Pick the one that matches where you want to land.
          </SectionHead>
          <BoardingPassGrid items={programs} />
        </div>
      </section>

      {/* ============ HEADLINE CLAIM ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-[0.95fr_1.05fr] items-start gap-14",
            "max-laptop:grid-cols-1 max-laptop:gap-10",
          )}
        >
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-(--r) bg-cloud">
            <Image
              src={headlineClaim.image}
              alt="Emporium students placed with airlines and hotel groups worldwide"
              fill
              sizes="(max-width: 960px) 92vw, 45vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal>
            <div className="flex items-end gap-3 font-heading text-[clamp(34px,4.5vw,54px)] leading-none font-bold text-royal">
              {headlineClaim.count}
              <h2 className={cn("text-black mb-1", columnHeading)}>
                {headlineClaim.line1}
              </h2>
            </div>
            <h2 className={cn("", columnHeading)}>
              {headlineClaim.line2}{" "}
              <span className="text-crimson">{headlineClaim.line3}</span>
            </h2>
            <p className="mt-5 max-w-[56ch] text-[15px] text-slate">
              {headlineClaim.body}
            </p>
            <Link
              href="/about"
              className={btn({
                variant: "dark",
                block: "phone",
                class: "mt-7.5",
              })}
            >
              View More <span className={arrow}>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ RECRUITER WALL ============ */}
      <section className={cn(surfacePaper, sectionPad)} id="recruiters">
        <div className={wrap}>
          <SectionHead eyebrow="Our students" title="get placed in.">
            {/* A snapshot of the airlines, airports, hotel groups and cruise lines
            that have taken on Emporium graduates. */}
          </SectionHead>
          <RecruiterWall />

          <div className="mt-14">
            <h3 className="mb-6 font-mono text-[12.5px] font-bold tracking-[0.34em] text-sky uppercase">
              Approved and accredited by
            </h3>
            <AccreditationStrip />
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      {/* <StatsBand /> */}

      {/* ============ CENTRES ============ */}
      <section className={cn(surfaceWhite, sectionPad)} id="centres">
        <div className={wrap}>
          <SectionHead
            eyebrow="Our centres"
            title="Training floors across the North East and beyond."
            center
          />

          <CentreGrid />
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className={cn(surfacePaper, sectionPad)} id="testimonials">
        <div className={wrap}>
          <SectionHead
            eyebrow="Student testimonial"
            title="In their own words."
          >
            Messages from students who trained at Emporium and went on to fly,
            serve and sail with brands around the world.
          </SectionHead>
          <TestimonialGallery />
        </div>
      </section>

      {/* ============ LATEST NEWS ============ */}
      <section className={cn(surfaceWhite, sectionPad)} id="news">
        <div className={wrap}>
          <SectionHead
            eyebrow="Latest news"
            title="From Emporium and the industry."
          />
          <NewsList />
        </div>
      </section>

      {/* ============ LATEST BLOG ============ */}
      <section className={cn(surfacePaper, sectionPad)} id="blog">
        <div className={wrap}>
          <SectionHead eyebrow="Latest blog" title="Reading for aspirants." />
          <BlogGrid />
        </div>
      </section>

      {/* ============ ENQUIRE ============ */}
      {/* <EnquirySection /> */}
    </>
  );
}
