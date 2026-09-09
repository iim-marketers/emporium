import { CentreRail } from "@/components/centre-rail";
import { EnquiryForm } from "@/components/enquiry-form";
import { HashScroll } from "@/components/hash-scroll";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections";
import { admissionOffices, centres } from "@/lib/centres";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  columnHeading,
  enquireSurface,
  eyebrowOnDark,
  sectionPad,
  specKeyOnDark,
  specRow,
  specRowOnDark,
  specValue,
  specValueOnDark,
  surfacePaper,
  surfaceWhite,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Emporium's corporate office in Kolkata plus training centres in Imphal, Senapati, Maram, Siliguri, Guwahati, Gangtok, Shillong and Itanagar — with phone numbers for each.",
  path: "/contact",
  keywords: [
    "Emporium contact",
    "training centres",
    "Kolkata aviation institute",
  ],
});

export default function ContactPage() {
  const { address } = site;

  return (
    <>
      <HashScroll id="enquire" />

      <PageHero
        eyebrow="Contact Us"
        title="Have a question? Let us know how we can help."
        lede="Call the admissions desk, drop us an email, or send the form below and we will get a call back to you."
        crumbs={[{ label: "Contact Us" }]}
      />

      {/* ============ CORPORATE OFFICE + CALLBACK FORM ============ */}
      <section className={cn(enquireSurface, sectionPad)}>
        <div
          className={cn(
            wrap,
            "relative grid grid-cols-[1fr_1.05fr] items-start gap-14",
            "max-laptop:grid-cols-1 max-laptop:gap-11",
          )}
        >
          <Reveal>
            <span className={eyebrowOnDark}>
              Emporium Training and Consultancy
            </span>
            <h2 className={cn("mt-4", columnHeading, "text-white")}>
              Get a call back.
            </h2>
            <p className="mt-4.5 max-w-[44ch] text-[17px] text-[#c8d2f4]">
              Free video counselling is available too — talk to our counsellors
              from home.
            </p>

            <div className="mt-8 grid gap-0">
              <div className={cn(specRow, specRowOnDark)}>
                <span className={specKeyOnDark}>Corporate office</span>
                <a
                  href={address.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(specValue, specValueOnDark)}
                >
                  {address.line1}, {address.line2},<br />
                  {address.city}, {address.pin}, {address.country}
                </a>
              </div>
              <div className={cn(specRow, specRowOnDark)}>
                <span className={specKeyOnDark}>Phone</span>
                <a
                  href={site.phoneHref}
                  className={cn(specValue, specValueOnDark, "font-mono")}
                >
                  {site.phone}
                </a>
              </div>
              <div className={cn(specRow, specRowOnDark)}>
                <span className={specKeyOnDark}>Email</span>
                <a
                  href={`mailto:${site.email}`}
                  className={cn(specValue, specValueOnDark)}
                >
                  {site.email}
                </a>
              </div>
              <div className={cn(specRow, specRowOnDark)}>
                <span className={specKeyOnDark}>Hours</span>
                <span className={cn(specValue, specValueOnDark)}>
                  {site.hours}
                </span>
              </div>
            </div>
          </Reveal>

          <div id="enquire">
            <Reveal>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CENTRES ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Our centres" title="Where you can train.">
            Emporium runs training inside established colleges and youth centres
            across the North East and West Bengal.
          </SectionHead>

          <CentreRail items={centres} label="Emporium training centres" />
        </div>
      </section>

      {/* ============ ADMISSION OFFICES ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Admission offices" title="Enquire in person." />
          <CentreRail
            items={admissionOffices}
            label="Emporium admission offices"
          />
        </div>
      </section>
    </>
  );
}
