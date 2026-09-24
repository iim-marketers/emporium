import { IndexList, pageBand, pageLabel, pageProse } from "@/components/page/kit";
import { PageHero } from "@/components/page-hero";
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
  eyebrow,
  title,
  lede,
  sections,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  sections: PolicySection[];
}) {
  const headed = sections.filter((section) => section.heading);

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        crumbs={[{ label: title }]}
      />

      <section className={cn(pageBand, "bg-white")}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-[240px_minmax(0,1fr)] items-start gap-16",
            "max-laptop:grid-cols-1 max-laptop:gap-10",
          )}
        >
          <nav
            aria-label="On this page"
            className="border-t border-ink/80 pt-5 laptop:sticky laptop:top-28 max-laptop:hidden"
          >
            <p className={cn(pageLabel, "text-[10px] text-slate/70")}>
              On this page
            </p>
            <ol className="mt-4 grid gap-2.5 p-0">
              {headed.map((section, i) => (
                <li key={section.heading} className="list-none">
                  <a
                    href={`#${anchor(section.heading!)}`}
                    className="grid grid-cols-[26px_1fr] text-[14px] leading-snug text-slate transition-colors hover:text-royal"
                  >
                    <span className="font-mono text-[11px] text-crimson">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
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
                  <p key={paragraph.slice(0, 40)} className={cn(pageProse, "mt-4")}>
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
