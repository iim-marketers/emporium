import { BoardingPassGrid } from "@/components/boarding-pass";
import { EnquirySection } from "@/components/enquiry-section";
import { PageHero } from "@/components/page-hero";
import { AccreditationStrip, SectionHead } from "@/components/sections";
import { eligibilityCriteria, programs, requiredDocuments } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";
import {
  checklist,
  checklistItem,
  checklistTick,
  columnHeading,
  panel,
  proseBody,
  sectionPad,
  split,
  surfacePaper,
  surfaceProgram,
  surfaceWhite,
  wrap,
} from "@/lib/styles";
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
        title="Offered by Emporium."
        lede="Three certificate courses covering aviation, hospitality, cruise lines and travel & tourism — each built around what recruiters actually screen for."
        crumbs={[{ label: "Courses" }]}
      />

      <section className={cn(surfaceProgram, sectionPad)}>
        <div className={wrap}>
          <BoardingPassGrid items={programs} />
        </div>
      </section>

      {/* ============ ELIGIBILITY ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={cn(wrap, split)}>
          <div>
            <h2 className={columnHeading}>Eligibility Criteria &amp; Documents</h2>
            <p className={cn("mt-5", proseBody)}>{eligibilityCriteria}</p>
            <p className={cn("mt-4", proseBody)}>
              Carry the following to your counselling session. Our admissions team
              will tell you exactly where you stand against the criteria of the
              airlines, hotels and cruise lines currently hiring.
            </p>
          </div>

          <div className={panel}>
            <h3 className="mb-4.5 text-[20px] font-semibold">
              Documents required
            </h3>
            <ul className={checklist}>
              {requiredDocuments.map((doc) => (
                <li key={doc} className={checklistItem}>
                  <span className={checklistTick}>✓</span> {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ ACCREDITATION ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead
            eyebrow="Approved and accredited by"
            title="Recognised where it counts."
          />
          <AccreditationStrip />
        </div>
      </section>

      <EnquirySection />
    </>
  );
}
