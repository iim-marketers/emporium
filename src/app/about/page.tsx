import Image from "next/image";
import Link from "next/link";

import { EnquirySection } from "@/components/enquiry-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  AccreditationStrip,
  EmpanelmentList,
  PillarGrid,
  SectionHead,
  StatsBand,
} from "@/components/sections";
import { arrow, btn } from "@/lib/btn";
import { aboutBody, aboutIntro } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import {
  columnHeading,
  proseBody,
  sectionPad,
  surfacePaper,
  surfaceWhite,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Emporium is a leading Vocational Training Provider under the Directorate General of Employment & Craftsmen Training, Ministry of Labour & Employment, Government of India — running certificate courses in aviation, hospitality and cruise line.",
  path: "/about",
  keywords: ["about Emporium", "vocational training provider", "VTP India"],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>Certificate course in Aviation, Hospitality &amp; Cruise line</>
        }
        lede={aboutIntro}
        crumbs={[{ label: "About Us" }]}
      />

      {/* ============ WHAT WE DO ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-[1.05fr_0.95fr] items-center gap-14",
            "max-laptop:grid-cols-1 max-laptop:gap-10",
          )}
        >
          <Reveal>
            <h2 className={columnHeading}>
              We Provide Our Best Courses of{" "}
              <span className="text-crimson">
                Aviation, Hospitality &amp; Cruise Line
              </span>
            </h2>
            <div className="mt-6 grid gap-5">
              {aboutBody.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={proseBody}>
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href="/programs"
              className={btn({
                variant: "dark",
                block: "phone",
                class: "mt-8",
              })}
            >
              Explore the courses <span className={arrow}>→</span>
            </Link>
          </Reveal>

          <Reveal className="relative aspect-4/3 overflow-hidden rounded-(--r) bg-cloud">
            <Image
              src="/misc/courses.jpg"
              alt="Emporium students in training"
              fill
              sizes="(max-width: 960px) 92vw, 45vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <StatsBand className={surfacePaper} />

      {/* ============ WHAT SETS US APART ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead
            eyebrow="Unlock your potential"
            title="With our certified courses."
          >
            Every course covers communication, grooming, English enhancement and
            personality development alongside detailed industry knowledge.
          </SectionHead>
          <PillarGrid />
        </div>
      </section>

      {/* ============ EMPANELMENT & ACCREDITATION ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-2 items-start gap-14",
            "max-laptop:grid-cols-1 max-laptop:gap-11",
          )}
        >
          <Reveal>
            <span className="font-mono text-[12.5px] font-bold tracking-[0.34em] text-sky uppercase">
              We are empaneled with
            </span>
            <h2 className={cn("mt-4 mb-7", columnHeading)}>
              State skill missions across India.
            </h2>
            <EmpanelmentList />
          </Reveal>

          <Reveal>
            <span className="font-mono text-[12.5px] font-bold tracking-[0.34em] text-sky uppercase">
              Approved and accredited by
            </span>
            <h2 className={cn("mt-4 mb-7", columnHeading)}>
              National skilling bodies.
            </h2>
            <AccreditationStrip />
          </Reveal>
        </div>
      </section>

      {/* <EnquirySection /> */}
    </>
  );
}
