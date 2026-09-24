import {
  Award,
  BookOpen,
  Camera,
  Check,
  Clock,
  FileText,
  GraduationCap,
  IdCard,
  School,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplyDialog } from "@/components/apply-dialog";
import { ScrollLink } from "@/components/hash-scroll";
import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { FaqList } from "@/components/news";
import {
  Accent,
  CtaBand,
  PageHead,
  pageBand,
  pageCard,
  pageLabel,
  pageProse,
} from "@/components/page/kit";

import { FactsCard, ImmersiveHero } from "@/components/page/immersive";
import { Reveal } from "@/components/reveal";
import { AccreditationStrip } from "@/components/sections";
import { arrow, btn } from "@/lib/btn";
import {
  courseHeroes,
  journey,
  moduleIcon,
  roleImages,
  roleLabel,
  workplaces,
} from "@/lib/course-visuals";
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

/** Wrapping rows with the last one centred, so an odd count never strands a
 *  tile at the left edge. */
const tileRow =
  "m-0 flex list-none flex-wrap justify-center gap-3 p-0 [&>li]:basis-[calc((100%-(var(--cols)-1)*0.75rem)/var(--cols))]";
const rowOf: Record<number, string> = {
  3: "[--cols:3]",
  4: "[--cols:4]",
  5: "[--cols:5]",
  6: "[--cols:6]",
};

const documentIcons: [RegExp, LucideIcon][] = [
  [/10 ?\+ ?2/i, GraduationCap],
  [/class 10/i, BookOpen],
  [/highest/i, Award],
  [/photo/i, Camera],
  [/aadhar|pan|passport|licen/i, IdCard],
];

function documentIcon(doc: string): LucideIcon {
  return documentIcons.find(([test]) => test.test(doc))?.[1] ?? FileText;
}

/** Career mosaic: the first role takes a 2×2 tile, and `wide` tiles close any
 *  gap the count would leave in the last row. */
function bentoFor(count: number) {
  const filled = 4 + (count - 1);
  for (const cols of [4, 5]) {
    const rows = Math.ceil(filled / cols);
    const spare = rows * cols - filled;
    if (rows >= 2 && spare <= 2) {
      const wide = Array.from({ length: spare }, (_, k) => count - 1 - k);
      return { cols: cols === 4 ? "grid-cols-4" : "grid-cols-5", wide };
    }
  }
  return { cols: "grid-cols-4", wide: [] as number[] };
}

export default async function ProgramPage({
  params,
}: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) notFound();

  const others = programs.filter((item) => item.slug !== program.slug);
  const workplace = workplaces[program.slug];
  const hero = courseHeroes[program.slug];
  const bento = bentoFor(program.careers.length);

  return (
    <>
      <div className="relative isolate [overflow:clip]">
        <div
          aria-hidden="true"
          className="sticky top-0 -z-10 -mb-[100svh] h-svh overflow-hidden bg-navy"
        >
          <Image
            src={workplace?.image ?? hero?.image ?? program.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,66,0.55)_0%,rgba(13,22,66,0.25)_40%,rgba(13,22,66,0.55)_100%)]" />
        </div>

        <ImmersiveHero
          title={program.heading}
          image={hero?.image ?? program.image}
          focus={hero?.focus}
        >
          <div className={heroCta}>
            <ApplyDialog
              label="Apply Now"
              subject={program.shortTitle}
              variant="ghost"
              block="phone"
            />
          </div>
        </ImmersiveHero>

        <FactsCard
          fields={[
            { label: "Duration", value: program.duration, icon: Clock },
            { label: "Level", value: program.level, icon: Award },
            { label: "Mode", value: program.mode, icon: School },
            { label: "Eligibility", value: "10+2 pass", icon: GraduationCap },
          ]}
        />

        <section className="relative pt-16 pb-6 max-phablet:pt-10">
          <div
            className={cn(
              wrap,
              "rounded-[16px] bg-white px-10 py-12 shadow-[0_40px_90px_-40px_rgba(8,12,36,0.6)] max-laptop:px-7 max-phablet:rounded-[12px] max-phablet:px-5 max-phablet:py-9",
            )}
          >
            <PageHead
              eyebrow="Careers"
              title={
                <>
                  The jobs this course <Accent>trains you for.</Accent>
                </>
              }
            />

            <ul
              className={cn(
                "m-0 grid list-none auto-rows-[clamp(180px,17vw,240px)] gap-3 p-0",
                bento.cols,
                "max-laptop:grid-cols-3 max-tablet:grid-cols-2 max-tablet:auto-rows-[200px] max-phone:auto-rows-[170px]",
              )}
            >
              {program.careers.map((career, i) => {
                const big = i === 0;
                const wide = bento.wide.includes(i);
                return (
                  <Reveal
                    as="li"
                    key={career}
                    className={cn(
                      "group relative overflow-hidden rounded-[8px] bg-navy",
                      big && "col-span-2 row-span-2",
                      wide && "col-span-2 max-laptop:col-span-1",
                    )}
                    style={{ transitionDelay: `${(i % 5) * 70}ms` }}
                  >
                    {roleImages[career] ? (
                      <ImageWithSkeleton
                        src={roleImages[career]}
                        alt={career}
                        fill
                        sizes={
                          big
                            ? "(max-width: 768px) 92vw, 50vw"
                            : "(max-width: 768px) 46vw, 25vw"
                        }
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(13,22,66,0.92)_100%)]"
                    />

                    <span
                      className={cn(
                        "absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 font-semibold tracking-[-0.015em] text-white",
                        big
                          ? "px-4 pb-3 text-[clamp(18px,1.7vw,24px)] leading-tight max-phone:p-4.5"
                          : "px-3 pb-3 text-[14px] leading-tight max-phone:p-3.5 max-phone:text-[13px]",
                      )}
                    >
                      {roleLabel(career)}
                    </span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>

        {workplace ? (
          <section className="relative isolate flex h-[clamp(360px,70vh,640px)] items-center text-white">
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(13,22,66,0.72)_0%,rgba(13,22,66,0.35)_60%,rgba(13,22,66,0.15)_100%)] max-tablet:bg-[radial-gradient(ellipse_90%_50%_at_50%_50%,rgba(13,22,66,0.75)_0%,rgba(13,22,66,0.3)_100%)]"
            />
            <Reveal className={cn(wrap, "text-center")}>
              <p className="flex items-center justify-center gap-4 font-mono text-[11px] font-bold tracking-[0.34em] text-white/85 uppercase max-phablet:text-[10px]">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-white/50 max-phablet:w-6"
                />
                {workplace.lead.replace(/:$/, "")}
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-white/50 max-phablet:w-6"
                />
              </p>
              <p className="mx-auto mt-5 font-hero text-[clamp(44px,6.4vw,104px)] leading-[0.98] tracking-[-0.02em] text-balance [text-shadow:0_4px_40px_rgba(8,12,36,0.45)]">
                {workplace.line}
              </p>
              <span
                aria-hidden="true"
                className="mx-auto mt-7 block h-0.5 w-12 bg-crimson"
              />
            </Reveal>
          </section>
        ) : null}

        <section className="relative py-6">
          <Reveal
            className={cn(
              wrap,
              "grid grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[16px] shadow-[0_40px_90px_-40px_rgba(8,12,36,0.6)] max-phablet:rounded-[12px]",
              "max-laptop:grid-cols-1",
            )}
          >
            <div className="relative isolate flex min-h-105 flex-col justify-end overflow-hidden bg-navy p-10 text-white max-laptop:min-h-80 max-phablet:p-6">
              <Image
                src="/home/photos/saree-namaste.webp"
                alt=""
                fill
                sizes="(max-width: 960px) 92vw, 42vw"
                className="-z-20 object-cover object-[50%_30%]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,22,66,0.15)_0%,rgba(13,22,66,0.55)_45%,rgba(13,22,66,0.95)_100%)]"
              />

              <h2 className="mt-4 font-hero text-[clamp(32px,3.4vw,48px)] leading-[1.04] font-normal tracking-[-0.015em]">
                Passed 12th?
                <br />
                <em className="text-haze not-italic">You can apply.</em>
              </h2>
            </div>

            <div className="bg-white px-10 py-9 max-phablet:px-5 max-phablet:py-7">
              <ul className="m-0 list-none p-0">
                {program.documents.map((doc) => {
                  const Icon = documentIcon(doc);
                  return (
                    <li
                      key={doc}
                      className="group flex items-center gap-4 border-b border-hairline py-4 last:border-b-0"
                    >
                      <span className="grid size-11 flex-none place-items-center rounded-[10px] bg-cloud text-roya">
                        <Icon className="size-5" strokeWidth={1.6} />
                      </span>
                      <span className="flex-1 text-[15px] leading-snug font-medium text-ink max-phablet:text-[14px]">
                        {doc}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="relative pt-6 pb-24 max-phablet:pb-14">
          <div
            className={cn(
              wrap,
              "rounded-[16px] bg-white px-10 py-12 shadow-[0_40px_90px_-40px_rgba(8,12,36,0.6)] max-laptop:px-7 max-phablet:rounded-[12px] max-phablet:px-5 max-phablet:py-9",
            )}
          >
            <div className="mx-auto max-w-200">
              <PageHead
                eyebrow="FAQs"
                title={
                  <>
                    Asked <Accent>and answered.</Accent>
                  </>
                }
                center
              />
              <Reveal>
                <FaqList items={program.faqs} />
              </Reveal>

              {/* <details className="group mt-10 border-t border-hairline pt-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14.5px] font-semibold text-royal [&::-webkit-details-marker]:hidden">
              Read the full course description
              <span
                aria-hidden="true"
                className="text-[20px] leading-none transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="mt-6 grid gap-8">
              {[program.whatIs, program.about, program.why].map((block) => (
                <div key={block.heading}>
                  <h2 className="text-[19px] leading-snug font-semibold text-ink">
                    {block.heading}
                  </h2>
                  <div className="mt-3 grid gap-3">
                    {block.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className={pageProse}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details> */}
            </div>
          </div>
        </section>
      </div>

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

      <section className={cn(pageBand, "bg-paper")}>
        <div className={wrap}>
          <PageHead
            eyebrow="Other courses"
            title={
              <>
                Explore <Accent>more careers.</Accent>
              </>
            }
          />
          <div className="grid grid-cols-2 gap-5 max-tablet:grid-cols-1">
            {others.map((item) => (
              <Reveal key={item.slug}>
                <Link
                  href={`/programs/${item.slug}`}
                  className="group relative isolate flex aspect-video flex-col justify-end overflow-hidden rounded-[6px] bg-navy p-7 text-white max-phablet:p-5"
                >
                  <ImageWithSkeleton
                    src={workplaces[item.slug]?.image ?? item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 92vw, 46vw"
                    className="-z-10 object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
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

      <CtaBand
        image={workplace?.image ?? program.image}
        eyebrow="Seats fill batch by batch"
        title="Ready to start?"
        actions={
          <>
            {/* <ScrollLink
              href="/enquire"
              to="enquire"
              className={btn({ block: "phone" })}
            >
              Enroll Now <span className={arrow}>→</span>
            </ScrollLink> */}
            <ApplyDialog
              label="Apply Now"
              subject={program.shortTitle}
              variant="ghost"
              block="phone"
            />
          </>
        }
      />
    </>
  );
}
