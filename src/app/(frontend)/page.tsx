import Link from "next/link";

import { DepartureBoard } from "@/components/departure-board";
import { CourseCarousel } from "@/components/home/course-carousel";
import { HomeHero } from "@/components/home/home-hero";
import { LifeReel } from "@/components/home/life-reel";
import { PillarPanels } from "@/components/home/pillar-panels";
import {
  ClosingCta,
  EditorialBand,
  FacesStrip,
  HomeHead,
  homePad,
  MomentsMosaic,
} from "@/components/home/sections";
import { BlogGrid } from "@/components/news";
import { Reveal } from "@/components/reveal";
import {
  AccreditationStrip,
  RecruiterWall,
  TrustStrip,
} from "@/components/sections";
import { TestimonialGallery } from "@/components/testimonial-videos";
import { getJobs, getPosts } from "@/lib/cms";
import { arrow, btn } from "@/lib/btn";
import { programs } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { heroSurface, wrap } from "@/lib/styles";
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
  const [latest, drives] = await Promise.all([getPosts(5), getJobs()]);

  return (
    <>
      <HomeHero />
      <section className={cn(heroSurface, homePad)} id="jobs">
        <div
          className={cn(
            wrap,
            "relative grid grid-cols-[0.85fr_1.15fr] items-center gap-14",
            "max-laptop:grid-cols-1 max-laptop:gap-11",
          )}
        >
          <div>
            <HomeHead
              eyebrow="Now boarding"
              title={
                <>
                  Campus interviews,{" "}
                  <em className="text-haze not-italic">happening now.</em>
                </>
              }
              onDark
            >
              Airlines, airports and hotel groups screen at Emporium centres
              throughout the year.
            </HomeHead>
            <Reveal className="mt-9 flex flex-wrap gap-3.5 max-phablet:flex-col">
              <Link href="/jobs" className={btn({ block: "phone" })}>
                See all jobs <span className={arrow}>→</span>
              </Link>
            </Reveal>
          </div>
          <DepartureBoard drives={drives} />
        </div>
      </section>

      <EditorialBand />
      <TrustStrip />

      <CourseCarousel items={programs}>
        <div className={wrap}>
          <HomeHead
            eyebrow="Our placement linked courses"
            title={
              <>
                Offered by <em className="text-haze not-italic">Emporium.</em>
              </>
            }
            onDark
            center
          >
            Three certificate courses, each a boarding pass into a specific
            industry. Pick the one that matches where you want to land.
          </HomeHead>
        </div>
      </CourseCarousel>
      <FacesStrip />

      <section
        className={cn("relative isolate overflow-hidden bg-white", homePad)}
      >
        <div className={wrap}>
          <HomeHead
            // eyebrow="Why Emporium"
            title={
              <>
                Trained the way{" "}
                <em className="text-crimson not-italic">the industry works.</em>
              </>
            }
            className="mb-16 max-phablet:mb-10"
          />
          <PillarPanels />
        </div>
      </section>

      <section className={cn("overflow-hidden bg-navy text-white", homePad)}>
        <LifeReel>
          <HomeHead
            eyebrow="Life at Emporium"
            title={
              <>
                Where training{" "}
                <em className="text-haze not-italic">looks like the job.</em>
              </>
            }
            onDark
          >
            Industry visits, orientation days and everyday moments from our
            centres and the hotels we train in.
          </HomeHead>
        </LifeReel>
      </section>

      <section className={cn("bg-white", homePad)} id="recruiters">
        <div className={wrap}>
          <HomeHead
            eyebrow="Placements"
            title={
              <>
                Where our{" "}
                <em className="text-crimson not-italic">students land.</em>
              </>
            }
            className="mb-12"
          >
            The airlines, airports, hotel groups and cruise lines that have
            hired Emporium graduates.
          </HomeHead>
          <RecruiterWall />

          <div className="mt-16">
            <h3 className="mb-6 font-mono text-[12px] font-bold tracking-[0.32em] text-sky uppercase">
              Approved and accredited by
            </h3>
            <AccreditationStrip />
          </div>
        </div>
      </section>

      <section className={cn("bg-paper", homePad)} id="moments">
        <div className={wrap}>
          <HomeHead
            eyebrow="Moments"
            title={
              <>
                A year at Emporium,{" "}
                <em className="text-crimson not-italic">in pictures.</em>
              </>
            }
            className="mb-12"
          />
          <MomentsMosaic />
        </div>
      </section>

      <section className={cn("bg-paper", homePad)} id="testimonials">
        <div className={wrap}>
          <HomeHead
            eyebrow="Student testimonial"
            title={
              <>
                In their <em className="text-crimson not-italic">own words.</em>
              </>
            }
            className="mb-12"
          >
            Films from students who trained at Emporium and went on to fly,
            serve and sail with brands around the world. Pick one to play it.
          </HomeHead>
          <TestimonialGallery />
        </div>
      </section>

      <section className={cn("bg-paper", homePad)} id="blog">
        <div className={wrap}>
          <HomeHead
            eyebrow="Latest blog"
            title="Reading for aspirants."
            className="mb-12"
          />
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

      {/* <ClosingCta />ß */}
    </>
  );
}
