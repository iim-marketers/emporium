import Image from "next/image";

import { EnquiryForm } from "@/components/enquiry-form";
import { HashScroll } from "@/components/hash-scroll";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections";
import {
  admissionOffices,
  centres,
  instagramUrl,
  type Centre,
} from "@/lib/centres";
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
  keywords: ["Emporium contact", "training centres", "Kolkata aviation institute"],
});

function CentreCard({ centre }: { centre: Centre }) {
  return (
    <Reveal
      as="article"
      className="overflow-hidden rounded-(--r) border border-hairline bg-white transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:shadow-(--shadow)"
    >
      <div className="relative aspect-16/9 bg-cloud">
        <Image
          src={centre.image}
          alt=""
          fill
          sizes="(max-width: 560px) 92vw, (max-width: 960px) 45vw, 30vw"
          className="object-cover"
        />
      </div>

      <div className="px-6 py-6">
        <h3 className="text-[19px] font-semibold text-royal">{centre.name}</h3>
        {centre.venue ? (
          <p className="mt-2 font-heading text-[15px] font-semibold text-ink">
            {centre.venue}
          </p>
        ) : null}
        <p className="mt-1.5 text-[15px] text-slate">
          {centre.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-hairline pt-4">
          {centre.phones.map((phone) => (
            <a
              key={phone.href}
              href={phone.href}
              className="font-mono text-[14.5px] text-royal hover:text-crimson-deep"
            >
              {phone.label}
            </a>
          ))}
        </div>

        {centre.instagram ? (
          <a
            href={instagramUrl(centre.instagram)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-[14px] text-slate transition-colors duration-200 hover:text-royal"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17" cy="7" r="1" />
            </svg>
            @{centre.instagram}
          </a>
        ) : null}
      </div>
    </Reveal>
  );
}

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
            <span className={eyebrowOnDark}>Emporium Training and Consultancy</span>
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

          <Reveal id="enquire" className="scroll-mt-24">
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      {/* ============ CENTRES ============ */}
      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Our centres" title="Where you can train.">
            Emporium runs training inside established colleges and youth centres
            across the North East and West Bengal.
          </SectionHead>

          <div className="grid grid-cols-3 gap-6 max-laptop:grid-cols-2 max-phone:grid-cols-1">
            {centres.map((centre) => (
              <CentreCard key={centre.slug} centre={centre} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ ADMISSION OFFICES ============ */}
      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Admission offices" title="Enquire in person." />
          <div className="grid grid-cols-3 gap-6 max-laptop:grid-cols-2 max-phone:grid-cols-1">
            {admissionOffices.map((office) => (
              <CentreCard key={office.slug} centre={office} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
