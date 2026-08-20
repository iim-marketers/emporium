import Link from "next/link";
import { notFound } from "next/navigation";

import { BoardingPass } from "@/components/boarding-pass";
import { EnquirySection } from "@/components/enquiry-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections";
import { getProgram, programs } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { arrow, btn } from "@/lib/btn";
import {
  cardBody,
  checklistItem,
  checklist,
  checklistTick,
  chipOnDark,
  chips,
  columnHeading,
  eyebrow,
  heroCta,
  moduleBody,
  moduleItem,
  moduleList,
  moduleTitle,
  moduleNo,
  panel,
  panelHeading,
  passGrid,
  proseBody,
  sectionPad,
  specKey,
  specRow,
  specValue,
  split,
  surfacePaper,
  surfaceProgram,
  surfaceWhite,
  trainSurface,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = getProgram(slug);

  if (!program) {
    return pageMetadata({
      title: "Program not found",
      description: "This program is not part of the current Emporium catalogue.",
      path: `/programs/${slug}`,
    });
  }

  return pageMetadata({
    title: program.title,
    description: `${program.description} ${program.duration} · ${program.level} · classroom training with grooming, interview prep and placement support.`,
    path: `/programs/${program.slug}`,
    keywords: [
      program.title.toLowerCase(),
      program.code.toLowerCase(),
      ...program.careers.map((career) => career.toLowerCase()),
    ],
  });
}

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = getProgram(slug);

  if (!program) notFound();

  const related = programs.filter((item) => item.slug !== program.slug).slice(0, 2);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    courseCode: program.code,
    description: program.description,
    provider: {
      "@type": "EducationalOrganization",
      name: site.legalName,
      url: site.url,
    },
    educationalCredentialAwarded: program.level,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: program.duration,
      location: {
        "@type": "Place",
        address: `${site.address.city}, ${site.address.state}, ${site.address.country}`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      <PageHero
        eyebrow={program.tag}
        title={program.title}
        lede={program.description}
        crumbs={[
          { label: "Programs", href: "/programs" },
          { label: program.shortTitle },
        ]}
      >
        <div className={cn(chips, "mt-7")}>
          <span className={chipOnDark}>{program.duration}</span>
          <span className={chipOnDark}>{program.level}</span>
          <span className={chipOnDark}>{program.mode}</span>
          <span className={chipOnDark}>Gate {program.gate}</span>
        </div>
        <div className={heroCta}>
          <Link href="/enquire" className={btn({ block: "phone" })}>
            Apply for this program <span className={arrow}>→</span>
          </Link>
          <Link href="/admissions" className={btn({ variant: "ghost", block: "phone" })}>
            How admissions work
          </Link>
        </div>
      </PageHero>

      {/* ============ OVERVIEW + SPEC ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div className={cn(wrap, split)}>
          <Reveal>
            <span className={eyebrow}>Overview</span>
            <h2 className={cn("mt-4", columnHeading)}>
              What this program is for.
            </h2>
            <p className={cn("mt-4.5", proseBody)}>{program.overview}</p>

            <h3 className={cn(panelHeading, "mt-9 mb-4")}>By the end, you can</h3>
            <ul className={checklist}>
              {program.outcomes.map((outcome) => (
                <li key={outcome} className={checklistItem}>
                  <span className={checklistTick}>✓</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className={panel}>
            <h3 className={panelHeading}>Program details</h3>
            <div className="grid gap-0">
              <div className={specRow}>
                <span className={specKey}>Course code</span>
                <span className={cn(specValue, "font-mono")}>{program.code}</span>
              </div>
              <div className={specRow}>
                <span className={specKey}>Duration</span>
                <span className={specValue}>{program.duration}</span>
              </div>
              <div className={specRow}>
                <span className={specKey}>Level</span>
                <span className={specValue}>{program.level}</span>
              </div>
              <div className={specRow}>
                <span className={specKey}>Mode</span>
                <span className={specValue}>{program.mode}</span>
              </div>
              <div className={specRow}>
                <span className={specKey}>Intake</span>
                <span className={specValue}>{program.intake}</span>
              </div>
              <div className={specRow}>
                <span className={specKey}>Gate</span>
                <span className={specValue}>{program.gate}</span>
              </div>
            </div>

            <h3 className={cn(panelHeading, "mt-7.5 mb-3.5")}>Eligibility</h3>
            <p className={cardBody}>{program.eligibility}</p>

            <Link
              href="/enquire"
              className={cn(btn({ variant: "dark" }), "mt-6.5 w-full justify-center")}
            >
              Enquire about fees <span className={arrow}>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ MODULES ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Curriculum" title="What you'll actually train on.">
            Modules run in sequence, with practical work in the cabin mock-up,
            grooming studio and computer lab woven through the whole program.
          </SectionHead>

          <ul className={moduleList}>
            {program.modules.map((module, index) => (
              <Reveal as="li" key={module.title} className={moduleItem}>
                <span className={moduleNo}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <b className={moduleTitle}>{module.title}</b>
                  <p className={moduleBody}>{module.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ CAREERS ============ */}
      <section className={cn(trainSurface, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Where it lands you" title="Roles this program targets." onDark>
            These are the job titles our placement cell puts graduates of{" "}
            {program.code} in front of. Final selection always depends on your
            performance and the recruiter&apos;s criteria.
          </SectionHead>

          <Reveal className={chips}>
            {program.careers.map((career) => (
              <span className={chipOnDark} key={career}>
                {career}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ RELATED ============ */}
      <section className={cn(surfaceProgram, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Other destinations" title="Also worth a look.">
            Students often compare {program.shortTitle} with these two before they
            decide.
          </SectionHead>
          <div className={passGrid}>
            {related.map((item) => (
              <BoardingPass key={item.slug} program={item} />
            ))}
          </div>
        </div>
      </section>

      <EnquirySection
        eyebrow={`Apply · ${program.code}`}
        title={
          <>
            Reserve your seat on
            <br />
            {program.shortTitle}.
          </>
        }
        lede={`Tell us a little about yourself and our admissions team will call you with fees, the next intake date and everything ${program.code} covers.`}
        defaultProgram={program.title}
      />
    </>
  );
}
