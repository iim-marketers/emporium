import Image from "next/image";

import { EnquirySection } from "@/components/enquiry-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections";
import { franchise } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import {
  checklist,
  checklistItem,
  checklistTick,
  columnHeading,
  panel,
  panelHeading,
  proseBody,
  sectionPad,
  split,
  surfacePaper,
  surfaceWhite,
  trainSurface,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Franchise",
  description:
    "Own an Emporium franchise. High returns in 12 to 18 months, 2000–2500 sq ft, ₹50–80 Lac investment — backed by marketing, staff recruitment and centralized course delivery.",
  path: "/franchise",
  keywords: ["training institute franchise", "aviation franchise India"],
});

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow={franchise.eyebrow}
        title={franchise.title}
        lede={franchise.returns}
        crumbs={[{ label: "Franchise" }]}
      />

      {/* ============ INVEST WITH EMPORIUM ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-[1.05fr_0.95fr] items-center gap-14",
            "max-laptop:grid-cols-1 max-laptop:gap-10",
          )}
        >
          <Reveal>
            <span className="font-mono text-[12.5px] font-bold tracking-[0.34em] text-sky uppercase">
              {franchise.invest}
            </span>
            <h2 className={cn("mt-4", columnHeading)}>{franchise.intro}</h2>
            <div className="mt-6 grid gap-5">
              {franchise.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={proseBody}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-5 max-phone:grid-cols-1">
              {franchise.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-(--r) border border-hairline bg-paper px-5.5 py-5"
                >
                  <div className="font-mono text-[10.5px] tracking-[0.16em] text-[#9098b4] uppercase">
                    {spec.label}
                  </div>
                  <div className="mt-1.5 font-heading text-[20px] font-semibold text-royal">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="relative aspect-4/3 overflow-hidden rounded-(--r) bg-cloud">
            <Image
              src={franchise.image}
              alt="Partnering with Emporium as a franchise owner"
              fill
              sizes="(max-width: 960px) 92vw, 45vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div className={cn(wrap, split)}>
          <div className={panel}>
            <h2 className={cn(panelHeading, "text-[24px]")}>
              Exclusive Business Benefits
            </h2>
            <ul className={cn(checklist, "mt-5")}>
              {franchise.benefits.map((item) => (
                <li key={item} className={checklistItem}>
                  <span className={checklistTick}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={panel}>
            <h2 className={cn(panelHeading, "text-[24px]")}>
              Emporium&apos;s Strong Support
            </h2>
            <ul className={cn(checklist, "mt-5")}>
              {franchise.support.map((item) => (
                <li key={item} className={checklistItem}>
                  <span className={checklistTick}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ RETURNS ============ */}
      <section className={cn(trainSurface, sectionPad)}>
        <div className={cn(wrap, "relative")}>
          <SectionHead eyebrow="Join hands" title={franchise.returns} onDark>
            Emporium has run skills development for over 15 years, placing
            30,000+ candidates worldwide through more than 10 centres across
            India.
          </SectionHead>
        </div>
      </section>

      {/* <EnquirySection
        eyebrow="Franchise enquiry"
        title={<>Own your franchise today.</>}
        lede="Tell us about yourself and the city you have in mind. Our franchise team will walk you through investment, site selection and the support that comes with it."
        subject="Franchise enquiry"
      /> */}
    </>
  );
}
