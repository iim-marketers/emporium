import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import type { PolicySection } from "@/lib/policies";
import { site } from "@/lib/site";
import {
  checklist,
  checklistItem,
  checklistTick,
  proseBody,
  sectionPad,
  surfaceWhite,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Shared shell for the privacy and cookie policies. */
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
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        crumbs={[{ label: title }]}
      />

      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={cn(wrap, "text-justify")}>
          <div className="grid gap-10">
            {sections.map((section, i) => (
              <Reveal key={section.heading ?? `intro-${i}`}>
                {section.heading ? (
                  <h2 className="mb-4 text-[24px] font-semibold text-ink">
                    {section.heading}
                  </h2>
                ) : null}

                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className={cn(proseBody, "mb-4 last:mb-0")}
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <ul className={cn(checklist, "mt-4")}>
                    {section.list.map((item) => (
                      <li key={item.slice(0, 40)} className={checklistItem}>
                        <span className={checklistTick}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.after?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className={cn(proseBody, "mt-4")}
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ))}

            <Reveal className="rounded-(--r) border border-hairline bg-paper px-7 py-6">
              <h2 className="mb-3.5 text-[20px] font-semibold">Contact us</h2>
              <p className={proseBody}>
                Email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-royal underline underline-offset-2"
                >
                  {site.email}
                </a>{" "}
                or call{" "}
                <a
                  href={site.phoneHref}
                  className="font-mono text-royal underline underline-offset-2"
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
