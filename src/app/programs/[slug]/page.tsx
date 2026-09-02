/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplyDialog } from "@/components/apply-dialog";
import { BoardingPass } from "@/components/boarding-pass";
import { EnquirySection } from "@/components/enquiry-section";
import { FaqList } from "@/components/news";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { AccreditationStrip, SectionHead } from "@/components/sections";
import { arrow, btn } from "@/lib/btn";
import { programBySlug, programs } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";
import {
  cardBody,
  checklist,
  checklistItem,
  checklistTick,
  chip,
  chips,
  columnHeading,
  heroCta,
  moduleItem,
  moduleList,
  moduleNo,
  moduleTitle,
  panel,
  panelHeading,
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

export async function generateMetadata({
  params,
}: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = programBySlug(slug);

  if (!program) {
    return pageMetadata({
      title: "Course not found",
      description: "This course is not part of the current Emporium catalogue.",
      path: `/programs/${slug}`,
    });
  }

  return pageMetadata({
    title: program.shortTitle,
    description: program.heading,
    path: `/programs/${program.slug}`,
    keywords: program.careers,
  });
}

/** A run of paragraphs under a two-line heading, as the course pages set them. */
function Prose({
  heading,
  body,
}: {
  heading: string;
  body: readonly string[];
}) {
  return (
    <Reveal>
      <h2 className={columnHeading}>{heading}</h2>
      <div className="mt-3 grid gap-3">
        {body.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className={cn(proseBody, "text-[15px] text-justify")}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Reveal>
  );
}

export default async function ProgramPage({
  params,
}: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) notFound();

  const others = programs.filter((item) => item.slug !== program.slug);

  return (
    <>
      <PageHero
        eyebrow={program.tag}
        title={program.heading}
        lede={program.description.replace(/…$/, "")}
        crumbs={[
          { label: "Courses", href: "/programs" },
          { label: program.shortTitle },
        ]}
      >
        <div className={heroCta}>
          <Link href="#enquire" className={btn({ block: "phone" })}>
            Enroll Now <span className={arrow}>→</span>
          </Link>
          <ApplyDialog
            label="Apply Now"
            subject={program.shortTitle}
            variant="ghost"
            block="phone"
          />
        </div>
      </PageHero>

      {/* ============ OVERVIEW + SPEC ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={cn(wrap, split)}>
          <div className="grid gap-12">
            <Prose
              heading={program.whatIs.heading}
              body={program.whatIs.body}
            />
            <Prose heading={program.about.heading} body={program.about.body} />
          </div>

          <Reveal className="grid gap-6">
            <div className="relative aspect-4/3 overflow-hidden rounded-(--r) bg-cloud">
              <Image
                src={program.image}
                alt=""
                fill
                sizes="(max-width: 960px) 92vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className={panel}>
              <h3 className={panelHeading}>Course at a glance</h3>
              <div className={specRow}>
                <span className={specKey}>Course Duration</span>
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
              <Link
                href="#enquire"
                className={btn({
                  variant: "dark",
                  block: "always",
                  class: "mt-6",
                })}
              >
                Enquire about this course <span className={arrow}>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHY EMPORIUM ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div className={cn(wrap, "")}>
          <Prose heading={program.why.heading} body={program.why.body} />
        </div>
      </section>

      {/* ============ POSITION DETAILS ============ */}
      <section className={cn(trainSurface, sectionPad)}>
        <div className={cn(wrap, "relative")}>
          <SectionHead
            eyebrow="Position details"
            title="Where this course places you."
            onDark
          />
          <div className="grid  gap-4.5">
            {program.overview.split("\n\n").map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[16.5px] text-[#c1cbee]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Reveal className="mt-12 rounded-(--r) border border-(--line-d) bg-white/4 px-7 py-7">
            <h3 className="mb-3.5 text-[20px] font-semibold text-white">
              Training Methodology
            </h3>
            <p className=" text-[15.5px] text-[#aebbe6]">
              {program.trainingMethodology}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ MODULES + JOB ROLES ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={cn(wrap, split)}>
          <div>
            <h2 className={columnHeading}>Course Modules</h2>
            <ul className={cn(moduleList, "mt-6")}>
              {program.modules.map((module, i) => (
                <li key={module} className={moduleItem}>
                  <span className={moduleNo}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={moduleTitle}>{module}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6">
            <div className={panel}>
              <h3 className={panelHeading}>Job positions</h3>
              <ul className={checklist}>
                {program.careers.map((role) => (
                  <li key={role} className={checklistItem}>
                    <span className={checklistTick}>✓</span> {role}
                  </li>
                ))}
              </ul>
            </div>

            <div className={panel}>
              <h3 className={panelHeading}>
                Eligibility Criteria &amp; Documents
              </h3>
              <p className={cardBody}>{program.eligibility}</p>
              <ul className={cn(checklist, "mt-4.5")}>
                {program.documents.map((doc) => (
                  <li key={doc} className={checklistItem}>
                    <span className={checklistTick}>✓</span> {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PAY PACKAGE ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead
            eyebrow="Industry pay package"
            title="What the roles pay."
          >
            Indicative bands published by the institute. Actual offers depend on
            the recruiter, the role and your performance at interview.
          </SectionHead>

          <div
            className={cn(
              "grid gap-6",
              program.pay.length > 1 ? "grid-cols-2 max-phone:grid-cols-1" : "",
            )}
          >
            {program.pay.map((band, i) => (
              <Reveal key={band.role ?? i} className={panel}>
                {band.role ? (
                  <div className={chips}>
                    <span className={chip}>{band.role}</span>
                  </div>
                ) : null}
                <div className={cn(band.role && "mt-5")}>
                  <div className="font-mono text-[10.5px] tracking-[0.16em] text-[#9098b4] uppercase">
                    Domestic job
                  </div>
                  <p className="mt-1.5 text-[16px] text-ink">{band.domestic}</p>
                </div>
                <div className="mt-5 border-t border-hairline pt-5">
                  <div className="font-mono text-[10.5px] tracking-[0.16em] text-[#9098b4] uppercase">
                    International job
                  </div>
                  <p className="mt-1.5 text-[16px] text-ink">
                    {band.international}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={cn(wrap, "")}>
          <SectionHead eyebrow="FAQs" title="Asked and answered." />
          <FaqList items={program.faqs} />
        </div>
      </section>

      {/* ============ ACCREDITATION ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Approved and" title="Accredited by." />
          <AccreditationStrip />
        </div>
      </section>

      {/* ============ OTHER COURSES ============ */}
      {/* <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Also at Emporium" title="Other courses." />
          <div className="grid grid-cols-2 gap-6.5 max-laptop:grid-cols-1">
            {others.map((item) => (
              <BoardingPass key={item.slug} program={item} />
            ))}
          </div>
        </div>
      </section> */}

      {/* <EnquirySection
        eyebrow="Book your seat"
        title={<>Ready to enroll?</>}
        subject={program.shortTitle}
      /> */}
    </>
  );
}
