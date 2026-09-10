/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";

import { BoardingPassGrid } from "@/components/boarding-pass";
import { CountFlip } from "@/components/count-flip";
import { Hero } from "@/components/hero";
import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { JobList } from "@/components/job-board";
import { BlogGrid, NewsList } from "@/components/news";
import { Reveal } from "@/components/reveal";
import {
  AccreditationStrip,
  CentreGrid,
  RecruiterWall,
  SectionHead,
  StatsBand,
  TrustStrip,
} from "@/components/sections";
import { TestimonialGallery } from "@/components/testimonial-videos";
import { getNews, getPosts } from "@/lib/cms";
import { arrow, btn } from "@/lib/btn";
import { headlineClaim } from "@/lib/content";
import { openDrives } from "@/lib/jobs";
import { programs } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  columnHeading,
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

export const revalidate = 3600;

export default async function HomePage() {
  const [latest, news] = await Promise.all([getPosts(5), getNews()]);

  const latestDrives = openDrives().slice(0, 2);

  return (
    <>
      <Hero />

      <TrustStrip />

      {latestDrives && latestDrives.length > 0 && (
        <section className={cn(surfacePaper, sectionPad)} id="jobs">
          <div className={wrap}>
            <SectionHead
              eyebrow="Newest jobs"
              title="Campus interviews, happening now."
              className="mb-4"
            >
              Airlines, airports and hotel groups screen at Emporium centres
              throughout the year.
            </SectionHead>
            <JobList items={latestDrives} />
          </div>
        </section>
      )}

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

      <section className={cn(surfaceWhite, sectionPad)}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-[0.95fr_1.05fr] items-start gap-14",
            "max-laptop:grid-cols-1 max-laptop:gap-10",
          )}
        >
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-(--r) bg-cloud">
            <ImageWithSkeleton
              src={headlineClaim.image}
              alt="Emporium students placed with airlines and hotel groups worldwide"
              fill
              sizes="(max-width: 960px) 92vw, 45vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal>
            <div className="flex items-end gap-3 font-heading text-[clamp(34px,4.5vw,48px)] leading-none font-bold text-royal">
              <CountFlip text={headlineClaim.count} />
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

      <section className={cn(surfacePaper, sectionPad)} id="recruiters">
        <div className={wrap}>
          <SectionHead eyebrow="Placements" title="Where our students land.">
            The airlines, airports, hotel groups and cruise lines that have
            hired Emporium graduates.
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

      {/* <StatsBand /> */}

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

      <section className={cn(surfacePaper, sectionPad)} id="testimonials">
        <div className={wrap}>
          <SectionHead
            eyebrow="Student testimonial"
            title="In their own words."
          >
            Films from students who trained at Emporium and went on to fly,
            serve and sail with brands around the world. Pick one to play it.
          </SectionHead>
          <TestimonialGallery />
        </div>
      </section>

      <section className={cn(surfaceWhite, sectionPad)} id="news">
        <div className={wrap}>
          <SectionHead
            eyebrow="Latest news"
            title="From Emporium and the industry."
          />
          <NewsList items={news} />
        </div>
      </section>

      <section className={cn(surfacePaper, sectionPad)} id="blog">
        <div className={wrap}>
          <SectionHead eyebrow="Latest blog" title="Reading for aspirants." />
          <BlogGrid posts={latest.slice(0, 4)} />

          {latest.length > 4 ? (
            <div className="mt-9 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/blog"
                className={btn({ variant: "outline", block: "phone" })}
              >
                All posts <span className={arrow}>→</span>
              </a>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
