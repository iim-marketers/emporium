import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplyDialog } from "@/components/apply-dialog";
import { ScrollLink } from "@/components/hash-scroll";
import { FaqList } from "@/components/news";
import {
  Accent,
  FactStrip,
  IndexList,
  PageHead,
  pageBand,
  pageCard,
  pageLabel,
  pageProse,
  Photo,
} from "@/components/page/kit";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { AccreditationStrip } from "@/components/sections";
import { arrow, btn } from "@/lib/btn";
import { programBySlug, programs } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";
import { heroCta, wrap } from "@/lib/styles";
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

function Prose({
  heading,
  body,
  className,
}: {
  heading: string;
  body: readonly string[];
  className?: string;
}) {
  return (
    <Reveal>
      <h2 className="font-sans text-[clamp(22px,2.4vw,30px)] leading-[1.2] font-semibold tracking-[-0.02em] text-ink">
        {heading}
      </h2>
      <div className={cn("mt-4 grid gap-4", className)}>
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className={pageProse}>
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
        lede={program.description.replace(/…$/, ".")}
        crumbs={[
          { label: "Courses", href: "/programs" },
          { label: program.shortTitle },
        ]}
        image={program.image}
        compact
      >
        <div className={heroCta}>
          <ScrollLink
            href="/enquire"
            to="enquire"
            className={btn({ block: "phone" })}
          >
            Enroll Now <span className={arrow}>→</span>
          </ScrollLink>
          <ApplyDialog
            label="Apply Now"
            subject={program.shortTitle}
            variant="ghost"
            block="phone"
          />
        </div>
      </PageHero>

      <section className={cn(pageBand, "bg-white")}>
        <div className={wrap}>
          <Reveal>
            <FactStrip
              items={[
                { label: "Duration", value: program.duration },
                { label: "Level", value: program.level },
                { label: "Mode", value: program.mode },
                { label: "Course code", value: program.code },
              ]}
            />
          </Reveal>

          <div
            className={cn(
              "mt-16 grid grid-cols-[1.2fr_0.8fr] items-start gap-16",
              "max-laptop:mt-12 max-laptop:grid-cols-1 max-laptop:gap-12",
            )}
          >
            <div className="grid gap-12">
              <Prose
                heading={program.whatIs.heading}
                body={program.whatIs.body}
              />
              <Prose
                heading={program.about.heading}
                body={program.about.body}
              />
            </div>

            <Reveal className="grid gap-5 laptop:sticky laptop:top-28">
              <Photo
                src={program.cardImage}
                sizes="(max-width: 960px) 92vw, 34vw"
                className="aspect-4/3"
                imgClassName="object-top"
                caption={program.shortTitle}
              />
              <div className={cn(pageCard, "px-6.5 py-6")}>
                <p className={cn(pageLabel, "text-crimson")}>Next intake</p>
                <p className="mt-2 text-[15px] text-slate">
                  Seats are filled batch by batch. Talk to admissions for the
                  next intake date and fees.
                </p>
                <ScrollLink
                  href="/enquire"
                  to="enquire"
                  className={btn({
                    variant: "dark",
                    block: "always",
                    class: "mt-5",
                  })}
                >
                  Enquire about this course <span className={arrow}>→</span>
                </ScrollLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={cn(pageBand, "bg-paper")}>
        <div className={wrap}>
          <PageHead
            eyebrow="Why this course"
            title={program.why.heading}
            className="mb-6"
          />
          <Reveal className="columns-2 gap-14 max-laptop:columns-1 [&>p]:mb-4 [&>p]:break-inside-avoid">
            {program.why.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={pageProse}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className={cn(pageBand, "bg-navy text-white")}>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(900px_480px_at_90%_0%,rgba(63,91,214,0.4),transparent_65%)]"
        />
        <div className={wrap}>
          <PageHead
            eyebrow="Position details"
            title={
              <>
                Where this course <Accent onDark>places you.</Accent>
              </>
            }
            onDark
          />
          <div className="grid grid-cols-[1.25fr_0.75fr] items-start gap-14 max-laptop:grid-cols-1 max-laptop:gap-10">
            <Reveal className="grid gap-4.5">
              {program.overview.split("\n\n").map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[15px] leading-[1.75] text-white/70"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal className="rounded-[6px] border border-white/15 bg-white/4 px-6.5 py-5">
              <p className={cn(pageLabel, "pt-1 pb-2 text-haze")}>
                Job positions
              </p>
              <IndexList items={program.careers} onDark />
            </Reveal>
          </div>

          <Reveal className="mt-12 grid grid-cols-[200px_1fr] gap-8 border-t border-white/15 pt-8 max-tablet:grid-cols-1 max-tablet:gap-3">
            <p className={cn(pageLabel, "text-haze")}>Training methodology</p>
            <p className="text-[15px] leading-[1.75] text-white/70">
              {program.trainingMethodology}
            </p>
          </Reveal>
        </div>
      </section>

      <section className={cn(pageBand, "bg-white")}>
        <div className={wrap}>
          <PageHead
            eyebrow="Curriculum"
            title={
              <>
                Course <Accent>modules.</Accent>
              </>
            }
          />
          <ol className="m-0 grid grid-cols-3 gap-4 p-0 max-laptop:grid-cols-2 max-phone:grid-cols-1">
            {program.modules.map((module, i) => (
              <Reveal
                as="li"
                key={module}
                className={cn(
                  pageCard,
                  "group flex list-none items-start gap-5 px-6 py-5.5 transition-colors duration-300 hover:border-royal/40 hover:bg-paper",
                )}
              >
                <span className="font-hero text-[34px] leading-none text-crimson/85">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-[15.5px] leading-snug font-medium text-ink">
                  {module}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className={cn(pageBand, "bg-paper")}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-[0.85fr_1.15fr] items-start gap-16",
            "max-laptop:grid-cols-1 max-laptop:gap-12",
          )}
        >
          <div className="laptop:sticky laptop:top-28">
            <PageHead
              eyebrow="Eligibility"
              title={
                <>
                  Who can <Accent>apply.</Accent>
                </>
              }
              className="mb-6"
            >
              {program.eligibility}
            </PageHead>
            <Reveal className={cn(pageCard, "px-6.5 py-4")}>
              <p className={cn(pageLabel, "pt-2 pb-1 text-crimson")}>
                Documents to bring
              </p>
              <IndexList items={program.documents} />
            </Reveal>
          </div>

          <div>
            <PageHead
              eyebrow="FAQs"
              title={
                <>
                  Asked <Accent>and answered.</Accent>
                </>
              }
            />
            <Reveal>
              <FaqList items={program.faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className={cn(pageBand, "bg-white")}>
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

      <section className={cn(pageBand, "bg-navy text-white")}>
        <div className={wrap}>
          <PageHead
            eyebrow="Other departures"
            title={
              <>
                Explore our <Accent onDark>other courses.</Accent>
              </>
            }
            onDark
          />
          <div className="grid grid-cols-2 gap-5 max-tablet:grid-cols-1">
            {others.map((item) => (
              <Reveal key={item.slug}>
                <Link
                  href={`/programs/${item.slug}`}
                  className="group relative isolate flex aspect-video flex-col justify-end overflow-hidden rounded-[6px] p-7 max-phablet:p-5"
                >
                  <Photo
                    src={item.image}
                    sizes="(max-width: 768px) 92vw, 46vw"
                    className="absolute! inset-0 -z-10 rounded-none"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_30%,rgba(13,22,66,0.92))]"
                  />
                  <span className={cn(pageLabel, "text-[10px] text-haze")}>
                    {item.tag}
                  </span>
                  <span className="mt-2 flex items-end justify-between gap-4 text-[clamp(19px,2vw,24px)] leading-tight font-semibold tracking-[-0.015em]">
                    {item.shortTitle}
                    <span
                      aria-hidden="true"
                      className="grid size-10 flex-none place-items-center rounded-full border border-white/40 text-[16px] transition-colors duration-300 group-hover:border-crimson group-hover:bg-crimson"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
