import Image from "next/image";

import { EnquirySection } from "@/components/enquiry-section";
import { Marquee, MarqueeRow } from "@/components/marquee";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  AccreditationStrip,
  RecruiterWall,
  SectionHead,
} from "@/components/sections";
import {
  alumni,
  placementCards,
  placementClaim,
  placementsBody,
  placementsIntro,
} from "@/lib/content";
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
  title: "Placements",
  description:
    "Over 15,100+ Emporium students placed in 14 different countries. How the Placement Assistance Cell screens, prepares and places candidates with airlines, hotels and cruise lines.",
  path: "/placements",
  keywords: ["aviation placements", "cabin crew jobs", "placement assistance"],
});

export default function PlacementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Placements"
        title={
          <>Certificate course in Aviation, Hospitality &amp; Cruise line</>
        }
        lede={placementsIntro}
        crumbs={[{ label: "Placements" }]}
      />

      {/* ============ THE CLAIM ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-[0.95fr_1.05fr] items-center gap-14",
            "max-laptop:grid-cols-1 max-laptop:gap-10",
          )}
        >
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-(--r) bg-cloud">
            <Image
              src={placementClaim.image}
              alt="Emporium students placed with leading airlines and hotel brands"
              fill
              sizes="(max-width: 960px) 92vw, 45vw"
              className="object-contain p-6"
            />
          </Reveal>

          <Reveal>
            <div className="font-heading text-[clamp(38px,5vw,60px)] leading-none font-bold text-royal">
              {placementClaim.count}
            </div>
            <h2 className={cn("mt-3", columnHeading)}>
              {placementClaim.line1}
              <br />
              <span className="text-crimson">{placementClaim.line2}</span>
            </h2>
            <div className="mt-6 grid gap-5">
              {placementsBody.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className={cn(proseBody, "text-justify")}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ OUR RECRUITERS ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Our" title="Recruiters.">
            The airlines, airports, hotel groups and cruise lines that hire from
            Emporium.
          </SectionHead>
          <RecruiterWall />
        </div>
      </section>

      {/* ============ RECRUITERS SPEAK ============ */}
      {/* <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Recruiters" title="Speak." />

          <div className="grid grid-cols-3 gap-6 max-laptop:grid-cols-1">
            {alumni.map((person) => (
              <Reveal
                key={person.name}
                as="article"
                className="flex flex-col rounded-(--r) border border-hairline bg-white px-6.5 py-7 transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:shadow-(--shadow)"
              >
                <p className="text-[15.5px] text-ink">{person.quote}</p>

                <div className="mt-auto flex items-center gap-4 border-t border-hairline pt-5.5">
                  <span className="relative size-14 flex-none overflow-hidden rounded-full bg-cloud">
                    <Image
                      src={person.image}
                      alt={`${person.name}, Emporium alumni at ${person.employer}`}
                      fill
                      sizes="56px"
                      className="object-cover object-top"
                    />
                  </span>
                  <div className="min-w-0">
                    <b className="block font-heading text-[16.5px] text-royal">
                      {person.name}
                    </b>
                    <span className="mt-0.5 block font-mono text-[11px] tracking-[0.14em] text-crimson uppercase">
                      {person.employer}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* ============ EMPORIUM ALUMNI ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Emporium" title="Alumni.">
            Students from North East India now working with some of the most
            eminent brands in aviation, hospitality and cruise.
          </SectionHead>

          <Reveal>
            <Marquee label="Emporium alumni and where they were placed">
              <MarqueeRow duration="42s" gap="gap-5">
                {placementCards.map((card, i) => (
                  <article
                    key={`${card.image}-${i}`}
                    className="w-[clamp(190px,23vw,248px)] flex-none overflow-hidden rounded-(--r) border border-hairline bg-white"
                  >
                    <div className="relative aspect-square bg-cloud">
                      <Image
                        src={card.image}
                        alt={`Emporium graduate placed with ${card.brand}`}
                        fill
                        sizes="248px"
                        loading="eager"
                        fetchPriority="low"
                        className="object-cover"
                      />
                    </div>
                    <div className="px-4.5 py-4">
                      <div className="font-heading text-[16px] font-semibold text-royal">
                        {card.brand}
                      </div>
                      <div className="mt-0.5 font-mono text-[11.5px] tracking-[0.14em] text-crimson uppercase">
                        {card.role}
                      </div>
                    </div>
                  </article>
                ))}
              </MarqueeRow>
            </Marquee>
          </Reveal>
        </div>
      </section>

      {/* ============ ACCREDITATION ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Approved and" title="Accredited by." />
          <AccreditationStrip />
        </div>
      </section>

      {/* <EnquirySection /> */}
    </>
  );
}
