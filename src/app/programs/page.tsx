import { BoardingPassGrid } from "@/components/boarding-pass";
import { EnquirySection } from "@/components/enquiry-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections";
import { programs } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";
import {
  chipOnDark,
  chips,
  elig,
  sectionPad,
  surfacePaper,
  surfaceProgram,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Programs",
  description:
    "Six career-ready programs across aviation, hospitality and travel — from an 8-month cabin crew certificate to a 12-month advanced airport management diploma.",
  path: "/programs",
  keywords: [
    "aviation courses after 12th",
    "cabin crew certificate course",
    "airport management diploma",
  ],
});

const diplomas = programs.filter((program) => program.level !== "Certificate");
const certificates = programs.filter((program) => program.level === "Certificate");

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs · Choose your destination"
        title="Six ways to board your career."
        lede="Each program is your boarding pass into a specific role. Pick the one that matches where you want to land — every one of them is classroom-based, hands-on and backed by the placement cell."
        crumbs={[{ label: "Programs" }]}
      >
        <div className={chips} style={{ marginTop: 28 }}>
          <span className={chipOnDark}>6 programs</span>
          <span className={chipOnDark}>6 – 12 months</span>
          <span className={chipOnDark}>Classroom · on campus</span>
          <span className={chipOnDark}>Rolling intakes</span>
        </div>
      </PageHero>

      <section className={cn(surfaceProgram, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Diplomas & advanced" title="The long-haul routes.">
            Broader programs for students who want the widest set of doors open, or
            who are aiming at supervisory and management tracks.
          </SectionHead>
          <BoardingPassGrid items={diplomas} />
        </div>
      </section>

      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Certificates" title="The fast-track routes.">
            Focused, shorter programs that point at one role and get you to a
            recruiter drive sooner.
          </SectionHead>
          <BoardingPassGrid items={certificates} />

          <Reveal className={elig}>
            <p>
              <b>Not sure which one?</b> Counselling is free. Tell us where you want
              to land and we will match you to the right program — and tell you
              honestly if a different one fits better.
            </p>
          </Reveal>
        </div>
      </section>

      <EnquirySection
        eyebrow="Book your seat"
        title={
          <>
            Pick a destination.
            <br />
            We&apos;ll do the rest.
          </>
        }
      />
    </>
  );
}
