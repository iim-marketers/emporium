import {
  IndexList,
  pageLabel,
  pageProse,
  PlainHero,
} from "@/components/page/kit";
import { PolicyToc } from "@/components/policy-toc";
import { Reveal } from "@/components/reveal";
import type { PolicySection } from "@/lib/policies";
import { site } from "@/lib/site";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function PolicyPage({
  title,
  lede,
  sections,
}: {
  title: string;
  lede?: string;
  sections: PolicySection[];
}) {
  const headed = sections.filter((section) => section.heading);

  return (
    <>
      <PlainHero label="Legal" title={title} lede={lede} />

      <section className="bg-white py-12">
        <div
          className={cn(
            wrap,
            "grid grid-cols-[240px_minmax(0,1fr)] items-start gap-16 max-laptop:grid-cols-1 max-laptop:gap-10",
          )}
        >
          <nav
            aria-label="On this page"
            className="laptop:sticky laptop:top-28 laptop:max-h-[calc(100svh-8rem)] laptop:overflow-y-auto max-laptop:hidden"
          >
            <p className={cn(pageLabel, "text-[10px] text-slate/70")}>
              On this page
            </p>
            <PolicyToc
              items={headed.map((section) => ({
                id: anchor(section.heading!),
                label: section.heading!,
              }))}
            />
          </nav>

          <div className="grid max-w-190 gap-12">
            {sections.map((section, i) => (
              <Reveal
                key={section.heading ?? `intro-${i}`}
                id={section.heading ? anchor(section.heading) : undefined}
                className="scroll-mt-28"
              >
                {section.heading ? (
                  <h2 className="mb-4 font-sans text-[clamp(20px,2vw,24px)] leading-snug font-semibold tracking-[-0.015em] text-ink">
                    {section.heading}
                  </h2>
                ) : null}

                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className={cn(pageProse, "mb-4 last:mb-0")}
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <IndexList items={section.list} className="mt-3" />
                ) : null}

                {section.after?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className={cn(pageProse, "mt-4")}
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ))}

            <Reveal className="rounded-[6px] bg-navy px-8 py-7 text-white max-phablet:px-5">
              <p className={cn(pageLabel, "text-[10px] text-haze")}>
                Contact us
              </p>
              <p className="mt-2 text-[16px] leading-relaxed text-white/85">
                Email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-white underline underline-offset-4"
                >
                  {site.email}
                </a>{" "}
                or call{" "}
                <a
                  href={site.phoneHref}
                  className="text-white underline underline-offset-4"
                >
                  {site.phone}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
