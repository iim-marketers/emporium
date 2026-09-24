import Link from "next/link";

import { BoardingPassGrid } from "@/components/boarding-pass";
import {
  CoverHero,
  Sheet,
  SheetNote,
  Stage,
} from "@/components/page/immersive";
import {
  Accent,
  CtaBand,
  IndexList,
  PageHead,
  pageBand,
  pageCard,
  pageLabel,
  pageProse,
} from "@/components/page/kit";
import { Reveal } from "@/components/reveal";
import { AccreditationStrip } from "@/components/sections";
import { arrow, btn } from "@/lib/btn";
import { pageImages } from "@/lib/page-images";
import {
  eligibilityCriteria,
  programs,
  requiredDocuments,
} from "@/lib/programs";
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

const img = pageImages.programs;

export default function ProgramsPage() {
  return (
    <>
      <Stage image={img.stage} focus={img.stageFocus}>
        <CoverHero
          label="Our courses"
          title={
            <>
              Placement linked courses,{" "}
              <Accent onDark>offered by Emporium.</Accent>
            </>
          }
          lede="Three certificate courses covering aviation, hospitality, cruise lines and travel & tourism — each built around what recruiters actually screen for."
          image={img.hero}
          focus={img.heroFocus}
        >
          <Link href="/enquire" className={btn({ block: "phone" })}>
            Book free counselling <span className={arrow}>→</span>
          </Link>
        </CoverHero>

        <Sheet first className="[--notch:#fff]">
          <PageHead
            eyebrow="Pick your gate"
            title={
              <>
                Choose the course that <Accent>fits your flight path.</Accent>
              </>
            }
          />
          <BoardingPassGrid items={programs} />
        </Sheet>

        <SheetNote lead="Your career" line="cleared for take-off." />

        <Sheet
          side="right"
          last
          className="grid grid-cols-[1.1fr_0.9fr] items-start gap-16 max-laptop:grid-cols-1 max-laptop:gap-12"
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
        </Sheet>
      </Stage>

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
