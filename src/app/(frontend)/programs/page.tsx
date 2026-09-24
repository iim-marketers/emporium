import Link from "next/link";

import { BoardingPassGrid } from "@/components/boarding-pass";
import {
  Accent,
  CtaBand,
  FactStrip,
  IndexList,
  PageHead,
  pageBand,
  pageCard,
  pageLabel,
  pageProse,
} from "@/components/page/kit";
import { FixedBackdrop, fixedSection } from "@/components/fixed-backdrop";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { AccreditationStrip } from "@/components/sections";
import { arrow, btn } from "@/lib/btn";
import {
  eligibilityCriteria,
  programs,
  requiredDocuments,
} from "@/lib/programs";
import { backgrounds as bg } from "@/lib/backgrounds";
import { pageMetadata } from "@/lib/seo";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Courses",
  description:
    "Emporium's placement-linked certificate courses in Aviation, Hospitality Management and Cruise Lines — modules, job roles, eligibility and industry pay packages.",
  path: "/programs",
  keywords: ["aviation course", "hospitality course", "cruise line course"],
});

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our placement linked courses"
        title={
          <>
            Offered by <Accent onDark>Emporium.</Accent>
          </>
        }
        lede="Three certificate courses covering aviation, hospitality, cruise lines and travel & tourism — each built around what recruiters actually screen for."
        crumbs={[{ label: "Courses" }]}
        image="/home/photos/aircraft-stairs.webp"
      />

      <section className={cn(pageBand, fixedSection, "text-white")}>
        <FixedBackdrop src={bg.courses} />
        <div className={cn(wrap, "[--notch:var(--navy)]")}>
          <PageHead
            eyebrow="Pick your gate"
            title={
              <>
                Choose the course that{" "}
                <Accent onDark>fits your flight path.</Accent>
              </>
            }
            onDark
          />
          <BoardingPassGrid items={programs} />
        </div>
      </section>

      <section className={cn(pageBand, "bg-white")}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-[1.1fr_0.9fr] items-start gap-16",
            "max-laptop:grid-cols-1 max-laptop:gap-12",
          )}
        >
          <div>
            <PageHead
              eyebrow="Before you apply"
              title={
                <>
                  Eligibility criteria <Accent>&amp; documents.</Accent>
                </>
              }
              className="mb-6"
            />
            <Reveal className="grid gap-4">
              <p className={pageProse}>{eligibilityCriteria}</p>
              <p className={pageProse}>
                Carry the following to your counselling session. Our admissions
                team will tell you exactly where you stand against the criteria
                of the airlines, hotels and cruise lines currently hiring.
              </p>
            </Reveal>
            <Reveal className="mt-9">
              <FactStrip
                items={[
                  { label: "Qualification", value: "10+2, any board" },
                  { label: "Counselling", value: "Free, in person or video" },
                  { label: "Placement", value: "100% assistance" },
                ]}
              />
            </Reveal>
          </div>

          <Reveal className={cn(pageCard, "overflow-hidden")}>
            <div className="flex items-center justify-between gap-4 bg-royal px-7 py-4 text-white max-phablet:px-5">
              <span className={pageLabel}>Documents required</span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-haze">
                {String(requiredDocuments.length).padStart(2, "0")} ITEMS
              </span>
            </div>
            <div className="border-t-2 border-dashed border-hairline px-7 py-3 max-phablet:px-5">
              <IndexList items={requiredDocuments} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className={cn(pageBand, "bg-paper")}>
        <div className={wrap}>
          <PageHead
            eyebrow="Approved and accredited by"
            title={
              <>
                Recognised <Accent>where it counts.</Accent>
              </>
            }
          />
          <AccreditationStrip />
        </div>
      </section>

      <CtaBand
        image="/home/photos/cabin-crew-batch.webp"
        eyebrow="Not sure which course?"
        title="Talk to a counsellor before you choose."
        actions={
          <>
            <Link href="/enquire" className={btn({ block: "phone" })}>
              Book free counselling <span className={arrow}>→</span>
            </Link>
            <Link
              href="/placements"
              className={btn({ variant: "ghost", block: "phone" })}
            >
              See placements
            </Link>
          </>
        }
      />
    </>
  );
}
